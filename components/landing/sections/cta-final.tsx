import { Check, MessageCircle } from "lucide-react";
import { NINC_WHATSAPP_URL } from "@/lib/landing-contact";
import { Container, Section, SectionHeading, ctaClassName } from "../primitives";
import { Reveal } from "../reveal";

const BENEFITS = [
  {
    title: "Uma reunião de implantação com a equipe NINC",
    description: "Nosso time vai ajudar você a dar os primeiros passos e iniciar sua jornada na plataforma.",
  },
  {
    title: "Uma vantagem que continua depois do lançamento",
    description: "Quem participa do acesso antecipado continua na plataforma após o lançamento oficial e ganha um desconto especial na assinatura.",
  },
];

export function FinalCta() {
  return (
    <Section id="cta-final" className="bg-white lg:py-28">
      <Container>
        <Reveal className="grid gap-10 rounded-3xl bg-gradient-to-br from-ninc-950 via-ninc-900 to-ninc-700 px-6 py-10 text-white shadow-2xl shadow-ninc-900/25 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:p-14">
          <div className="min-w-0">
            <SectionHeading
              id="cta-final-titulo"
              tone="dark"
              eyebrow="30 vagas · Acesso antecipado"
              title="Comece antes do lançamento. Com a NINC ao seu lado."
              description="Estamos liberando 30 acessos antecipados para quem quer organizar propostas, contratos e o financeiro antes do lançamento oficial."
            />
            <ul className="mt-8 space-y-6">
              {BENEFITS.map(({ title, description }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <Check aria-hidden="true" className="h-4 w-4 text-sky-200" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold leading-6">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ninc-100/80">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-2xl bg-white p-6 text-slate-950 shadow-xl shadow-ninc-950/20 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ninc-700">Seu acesso antecipado</p>
            <h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">7 dias grátis</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Conheça a plataforma e veja como ela funciona na sua rotina.</p>

            <div className="my-6 border-y border-slate-200 py-6">
              <p className="text-sm font-medium text-slate-700">Depois do teste, só se você quiser continuar:</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-1 text-ninc-800">
                <span className="text-4xl font-semibold tracking-tight">R$ 50,00</span>
                <span className="text-base font-medium">/mês</span>
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Esse valor mensal sela o compromisso durante o acesso antecipado e vale até o lançamento oficial.</p>
            </div>

            <a
              href={NINC_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName("primary", "lg", "h-auto min-h-[3rem] w-full whitespace-normal px-4 py-3 text-center")}
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
              <span>Solicitar meu acesso pelo WhatsApp</span>
            </a>
            <p className="mt-4 text-center text-sm leading-6 text-slate-600">Envie uma mensagem no WhatsApp da NINC. Nossa equipe vai enviar sua senha de acesso para você começar.</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
