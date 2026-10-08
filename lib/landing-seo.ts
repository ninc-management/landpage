import type { Metadata, MetadataRoute } from 'next';
import { resolveSiteSettings } from '../config/site.cjs';

export const LANDING_TITLE = 'NINC ERP | ERP para engenharia e projetos';
export const LANDING_DESCRIPTION = 'ERP para empresas de engenharia e projetos: propostas com sua marca, contratos, gestão financeira, conciliação bancária e IA conectada em um só sistema.';

type SeoEnvironment = Partial<Record<'NODE_ENV' | 'NINC_SITE_URL' | 'NINC_SEO_INDEXABLE' | 'VERCEL_ENV' | 'GOOGLE_SITE_VERIFICATION', string>>;
export type SeoConfig = { url: string; indexable: boolean; googleVerification?: string };

/** Domínio próprio atual ou URL do projeto Pages, definidos somente no build. */
export function getSeoConfig(env: SeoEnvironment = process.env): SeoConfig {
  const url = new URL(resolveSiteSettings(env).url);
  return {
    url: url.href,
    indexable: env.NINC_SEO_INDEXABLE !== 'false' && env.VERCEL_ENV !== 'preview'
      && (env.NODE_ENV === 'production' || env.NINC_SEO_INDEXABLE === 'true'),
    googleVerification: env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
  };
}

export function getLandingMetadata(config: SeoConfig = getSeoConfig()): Metadata {
  const image = {
    url: new URL('landing/social-preview.png', config.url).href,
    width: 1200,
    height: 630,
    alt: 'NINC ERP — propostas, contratos e financeiro para engenharia e projetos',
  };
  return {
    metadataBase: new URL(config.url),
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    applicationName: 'NINC ERP',
    icons: {
      icon: [{ url: new URL('landing/favicon.svg', config.url).pathname, type: 'image/svg+xml' }],
      shortcut: new URL('landing/favicon.svg', config.url).pathname,
      apple: [{ url: new URL('landing/apple-touch-icon.png', config.url).pathname, sizes: '180x180', type: 'image/png' }],
    },
    alternates: { canonical: config.url },
    robots: {
      index: config.indexable,
      follow: true,
      googleBot: { index: config.indexable, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'NINC ERP',
      url: config.url,
      title: LANDING_TITLE,
      description: LANDING_DESCRIPTION,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: LANDING_TITLE, description: LANDING_DESCRIPTION, images: [image] },
    verification: config.googleVerification ? { google: config.googleVerification } : undefined,
  };
}

export function getSeoRobots(config: SeoConfig = getSeoConfig()): MetadataRoute.Robots {
  if (!config.indexable) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: new URL('sitemap.xml', config.url).href };
}

export function getSeoSitemap(config: SeoConfig = getSeoConfig()): MetadataRoute.Sitemap {
  // Âncoras são seções da mesma página; não publique URLs fictícias nem datas de atualização artificiais.
  return config.indexable ? [{ url: config.url }] : [];
}

export function getLandingSchema(config: SeoConfig = getSeoConfig()) {
  const id = (fragment: string) => `${config.url}#${fragment}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': id('organizacao'), name: 'NINC', url: config.url,
        logo: { '@type': 'ImageObject', url: new URL('landing/ninc-erp.png', config.url).href, width: 1302, height: 518 },
        email: 'suporte@ninc.digital',
      },
      {
        '@type': 'WebSite', '@id': id('site'), name: 'NINC ERP', url: config.url,
        inLanguage: 'pt-BR', publisher: { '@id': id('organizacao') },
      },
      {
        '@type': 'WebPage', '@id': id('pagina'), url: config.url, name: LANDING_TITLE,
        description: LANDING_DESCRIPTION, inLanguage: 'pt-BR', isPartOf: { '@id': id('site') },
        about: { '@id': id('software') }, mainEntity: { '@id': id('software') },
        primaryImageOfPage: { '@type': 'ImageObject', url: new URL('landing/social-preview.png', config.url).href, width: 1200, height: 630 },
      },
      {
        '@type': 'WebApplication', '@id': id('software'), name: 'NINC ERP', url: config.url,
        description: LANDING_DESCRIPTION, applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web', browserRequirements: 'Navegador web com JavaScript', inLanguage: 'pt-BR',
        publisher: { '@id': id('organizacao') },
        featureList: ['Propostas comerciais com a identidade da empresa', 'Contratos gerados a partir de propostas aprovadas', 'Gestão financeira e conciliação bancária', 'Resultados por contrato e centro de custo', 'Permissões de acesso por colaborador', 'Integração com assistentes de IA por MCP'],
      },
    ],
  };
}

/** Impede que um texto encerre a tag script onde o JSON-LD é renderizado. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
