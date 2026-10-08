import { Check } from "lucide-react";
import { Container, Section, SectionHeading, FOCUS } from "../primitives";
import { Reveal, Stagger, StaggerItem } from "../reveal";

const RECAP = [
  "Proposta aprovada",
  "Contrato gerado",
  "Parcelas no financeiro",
  "Mês conciliado",
];

export function FinalCta() {
  return (
    <Section id="cta-final" className="bg-white lg:py-28">
      <Container>
        <Reveal className="grid gap-10 rounded-3xl bg-gradient-to-br from-ninc-950 via-ninc-900 to-ninc-700 px-6 py-12 text-white shadow-2xl shadow-ninc-900/25 sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-16">
          <div>
            <SectionHeading
              id="cta-final-titulo"
              tone="dark"
              eyebrow="Do orçamento ao fechamento"
              title="Uma operação conectada. Do início ao fim."
              description="Propostas com a sua marca, contratos organizados e o financeiro no mesmo lugar. Conheça o NINC ERP e veja como ele pode fazer parte da sua rotina."
            />
            <p className="mt-6 text-sm text-ninc-100/80">
              Fale com a nossa equipe:{" "}
              <a
                href="mailto:suporte@ninc.digital"
                className={`rounded font-medium text-white underline underline-offset-4 ${FOCUS}`}
              >
                suporte@ninc.digital
              </a>
            </p>
          </div>
          <Stagger as="ol" className="space-y-3">
            {RECAP.map((step, index) => (
              <StaggerItem
                as="li"
                key={step}
                className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4 ring-1 ring-white/15"
              >
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-emerald-300"
                />
                <span className="flex-1 text-sm font-medium">{step}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-ninc-100/50"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </Container>
    </Section>
  );
}
