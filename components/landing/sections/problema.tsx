import { ArrowRight, Check, Minus } from "lucide-react";
import { NincMonogram } from "@/components/ninc-logo";
import { Container, Crosshairs, FOCUS, Section, SectionHeading } from "@/components/landing/primitives";
import { Stagger, StaggerItem } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

/** Cada dor mapeada 1:1 para um recurso real do NINC. [antes, com o NINC] */
const ROWS: Array<[string, string]> = [
  [
    "Cada proposta sai de um arquivo diferente, com um visual diferente.",
    "Propostas padronizadas com escopo, equipe, itens e condições de pagamento, em PDF com a sua marca.",
  ],
  [
    "A aprovação chega por e-mail e ninguém avisa o financeiro.",
    "Ao marcar a proposta como aprovada, o contrato é gerado automaticamente.",
  ],
  [
    "Parcelas a receber anotadas numa planilha paralela.",
    "Contas a receber com o total, o que está vencido e o que vence a seguir.",
  ],
  [
    "Extrato bancário conferido linha a linha no fim do mês.",
    "Conciliação que separa equivalências exatas, similares e movimentos novos para você confirmar em lote.",
  ],
  [
    "O custo de cada projeto só aparece quando já é tarde.",
    "Rateio por centro de custo e unidade de negócio, com relatórios por contrato.",
  ],
];

const MICRO = "mb-3 block font-mono text-[11px] font-medium uppercase tracking-[0.2em] sm:hidden";
const HAIRLINE = "border-slate-200 dark:border-white/10";

export function ProblemSection() {
  return (
    <Section
      id="problema"
      className="border-y border-slate-200/70 bg-slate-50/70 dark:border-white/5 dark:bg-ninc-900/30"
    >
      <Container className="max-w-5xl">
        <SectionHeading
          id="problema-titulo"
          align="center-lg"
          eyebrow="Diagnóstico"
          title="Sua empresa entrega projetos. A gestão não pode virar mais um."
          description="Proposta no editor de texto, recebimentos na planilha, extrato conferido à mão. Cada ferramenta solta é mais um lugar para o número não bater."
        />

        <div
          className={cn(
            "group relative mt-14 rounded-3xl border bg-white shadow-sm shadow-ninc-900/5 dark:bg-ninc-950/60",
            HAIRLINE
          )}
        >
          <Crosshairs />

          <div className="relative overflow-hidden rounded-[inherit]">
            {/* Lavagem da marca atrás da coluna "Como fica no NINC". */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-b from-ninc-50/80 via-ninc-50/30 to-transparent sm:block dark:from-ninc-400/[0.07] dark:via-ninc-400/[0.02]"
            />

            <div
              aria-hidden="true"
              className={cn(
                "relative hidden grid-cols-2 border-b font-mono text-[11px] font-medium uppercase tracking-[0.2em] sm:grid",
                HAIRLINE
              )}
            >
              <p className="px-8 py-4 text-slate-500 dark:text-ninc-100/60">Como costuma ser</p>
              <p className={cn("flex items-center gap-2 border-l px-8 py-4 text-ninc-700 dark:text-ninc-300", HAIRLINE)}>
                <NincMonogram size={12} aria-hidden="true" className="text-ninc-700 dark:text-ninc-300" />
                Como fica no NINC
              </p>
            </div>

            <Stagger as="ul" y={12} className="relative divide-y divide-slate-200 dark:divide-white/10">
              {ROWS.map(([before, after]) => (
                <StaggerItem
                  as="li"
                  key={before}
                  className="group/row relative grid transition-colors duration-300 hover:bg-slate-50/70 sm:grid-cols-2 dark:hover:bg-white/[0.02]"
                >
                  <div className="p-6 text-sm leading-6 text-slate-500 sm:px-8 sm:py-6 sm:text-base sm:leading-6 dark:text-ninc-100/60">
                    <span aria-hidden="true" className={cn(MICRO, "text-slate-500 dark:text-ninc-100/60")}>
                      Antes
                    </span>
                    <p className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-ninc-100/40">
                        <Minus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span>
                        <span className="sr-only">Antes: </span>
                        {before}
                      </span>
                    </p>
                  </div>

                  <div
                    className={cn(
                      "px-6 pb-6 text-sm font-medium leading-6 text-slate-900 sm:border-l sm:p-6 sm:px-8 sm:text-base sm:leading-6 dark:text-white",
                      "sm:border-slate-200 dark:sm:border-white/10"
                    )}
                  >
                    <span aria-hidden="true" className={cn(MICRO, "text-ninc-700 dark:text-ninc-300")}>
                      Com o NINC
                    </span>
                    <p className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/10 transition-colors duration-300 group-hover/row:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/[.15] dark:group-hover/row:bg-emerald-400/20">
                        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span>
                        <span className="sr-only">Com o NINC: </span>
                        {after}
                      </span>
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-ninc-700 shadow-sm transition-colors duration-300 group-hover/row:border-ninc-700 group-hover/row:bg-ninc-700 group-hover/row:text-white sm:grid dark:border-white/10 dark:bg-ninc-900 dark:text-ninc-300 dark:group-hover/row:border-ninc-400 dark:group-hover/row:bg-ninc-400 dark:group-hover/row:text-ninc-950"
                  >
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover/row:translate-x-0.5" />
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <p className="mt-10 text-sm text-slate-600 lg:text-center dark:text-ninc-100/75">
          Um sistema só, do orçamento ao fechamento do mês.{" "}
          <a
            href="#fluxo"
            className={cn(
              "group/link inline-flex items-center gap-1 rounded-sm font-semibold text-ninc-700 underline-offset-4 hover:underline dark:text-ninc-300",
              FOCUS
            )}
          >
            Veja o fluxo completo
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform motion-safe:group-hover/link:translate-x-1"
            />
          </a>
        </p>
      </Container>
    </Section>
  );
}
