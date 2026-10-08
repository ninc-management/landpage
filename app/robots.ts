import { getSeoRobots } from '@/lib/landing-seo';
export const dynamic = 'force-static';

export default function robots() {
  return getSeoRobots();
}
