import { getSeoSitemap } from '@/lib/landing-seo';
export const dynamic = 'force-static';

export default function sitemap() {
  return getSeoSitemap();
}
