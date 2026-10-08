import { getLandingMetadata, getLandingSchema, getSeoConfig, getSeoRobots, getSeoSitemap, serializeJsonLd } from './landing-seo';

describe('public landing SEO', () => {
  const production = getSeoConfig({ NODE_ENV: 'production' });

  it('uses the confirmed domain and keeps development and previews out of indexing', () => {
    expect(production.url).toBe('https://ninc.digital/');
    expect(production.indexable).toBe(true);
    expect(getSeoConfig({ NODE_ENV: 'development' }).indexable).toBe(false);
    expect(getSeoConfig({ NODE_ENV: 'production', VERCEL_ENV: 'preview' }).indexable).toBe(false);
    expect(getSeoConfig({ NODE_ENV: 'production', NINC_SEO_INDEXABLE: 'false' }).indexable).toBe(false);
  });

  it('rejects local, insecure or malformed canonical addresses', () => {
    for (const url of ['http://app.ninc.digital', 'https://localhost', 'https://127.0.0.1', 'invalid', 'https://user:pass@example.com', 'https://example.com/?test=1']) {
      expect(() => getSeoConfig({ NINC_SITE_URL: url })).toThrow();
    }
  });

  it('uses consistent canonical and sharing URLs, without invented keywords', () => {
    const metadata = getLandingMetadata(production);
    expect(metadata.alternates).toEqual({ canonical: production.url });
    expect(metadata.openGraph).toMatchObject({ url: production.url, locale: 'pt_BR', siteName: 'NINC ERP', type: 'website' });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.keywords).toBeUndefined();
    expect(JSON.stringify(metadata)).not.toContain('localhost');
  });

  it('lists only the landing in the sitemap and lets crawlers load its assets', () => {
    expect(getSeoSitemap(production)).toEqual([{ url: production.url }]);
    expect(getSeoRobots(production)).toMatchObject({ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://ninc.digital/sitemap.xml' });
    const preview = getSeoConfig({ NODE_ENV: 'development' });
    expect(getSeoSitemap(preview)).toEqual([]);
    expect(getSeoRobots(preview)).toEqual({ rules: { userAgent: '*', disallow: '/' } });
  });

  it('preserves a future GitHub Pages subdirectory in every URL', () => {
    const config = getSeoConfig({ NODE_ENV: 'production', NINC_SITE_URL: 'https://example.github.io/ninc' });
    expect(config.url).toBe('https://example.github.io/ninc/');
    expect(getSeoRobots(config).sitemap).toBe('https://example.github.io/ninc/sitemap.xml');
    expect(JSON.stringify(getLandingMetadata(config))).toContain('https://example.github.io/ninc/landing/social-preview.png');
  });

  it('connects the real brand, website and product without inventing prices or ratings', () => {
    const schema = getLandingSchema(production);
    expect(schema['@graph'].map(entity => entity['@type'])).toEqual(['Organization', 'WebSite', 'WebPage', 'WebApplication']);
    expect(JSON.stringify(schema)).toContain('suporte@ninc.digital');
    expect(JSON.stringify(schema)).not.toMatch(/offers|aggregateRating|price|SearchAction/);
    const ids = schema['@graph'].map(entity => entity['@id']);
    expect(new Set(ids).size).toBe(4);
    expect(ids.every(id => id.startsWith(production.url))).toBe(true);
  });

  it('escapes script delimiters without changing the parsed data', () => {
    const value = { text: '</script><script>alert(1)</script> & \u2028' };
    const json = serializeJsonLd(value);
    expect(json).not.toContain('<');
    expect(JSON.parse(json)).toEqual(value);
  });

  it('adds Search Console verification only when a real token is configured', () => {
    expect(getLandingMetadata(production).verification).toBeUndefined();
    expect(getLandingMetadata(getSeoConfig({ GOOGLE_SITE_VERIFICATION: ' test-token ' })).verification).toEqual({ google: 'test-token' });
  });
});
