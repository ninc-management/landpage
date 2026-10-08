import { MotionProvider } from "./reveal";
import { SiteHeader } from "./sections/site-header";
import { Hero } from "./sections/inicio";
import { AudienceStrip } from "./sections/publico";
import { ProblemSection } from "./sections/problema";
import { FlowSection } from "./sections/fluxo";
import { ProductTour } from "./sections/plataforma";
import { ProposalsSection } from "./sections/propostas";
import { FinanceSection } from "./sections/financeiro";
import { TeamSecuritySection } from "./sections/equipe";
import { AiSection } from "./sections/ia";
import { GetStarted } from "./sections/implantacao";
import { PresentationVideo } from "./sections/apresentacao";
import { TestimonialsSection } from "./sections/depoimentos";
import { FaqSection } from "./sections/duvidas";
import { FinalCta } from "./sections/cta-final";
import { SiteFooter } from "./sections/site-footer";
import { getLandingSchema, serializeJsonLd } from "@/lib/landing-seo";

/** Página pública sem consulta de planos ou dependência comercial do banco. */
export function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getLandingSchema()) }} />
      <noscript>
        <style>{`[data-landing-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <a
        href="#conteudo"
        className="sr-only rounded-lg bg-white px-4 py-2 font-medium text-ninc-900 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:outline-none focus:ring-2 focus:ring-ninc-600"
      >
        Pular para o conteúdo
      </a>
      <MotionProvider>
        <div className="min-h-screen overflow-x-clip bg-white text-slate-950 antialiased dark:bg-ninc-950 dark:text-white">
          <SiteHeader />
          <main id="conteudo">
            <Hero />
            <AudienceStrip />
            <PresentationVideo />
            <ProblemSection />
            <FlowSection />
            <ProductTour />
            <ProposalsSection />
            <FinanceSection />
            <TeamSecuritySection />
            <AiSection />
            <GetStarted />
            <TestimonialsSection />
            <FaqSection />
            <FinalCta />
          </main>
          <SiteFooter />
        </div>
      </MotionProvider>
    </>
  );
}
