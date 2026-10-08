import { LandingPage } from '@/components/landing/landing-page';
import { getLandingMetadata } from '@/lib/landing-seo';

export const metadata = getLandingMetadata();
export const dynamic = 'error';

export default function HomePage() {
  return <LandingPage />;
}
