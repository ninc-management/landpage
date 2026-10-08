import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';

export const metadata: Metadata = {
  title: 'NINC ERP',
  description: 'Gestão comercial e financeira para engenharia e projetos.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className="light"><body className="font-sans">{children}</body></html>;
}
