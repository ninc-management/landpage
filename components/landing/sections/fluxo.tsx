"use client";

import { assetPath } from "@/lib/assets";


import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarClock,
  Check,
  FileDown,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { NincMonogram } from "@/components/ninc-logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BlueprintGrid,
  Callout,
  Container,
  Cota,
  CtaLink,
  FOCUS_DARK,
  MASK,
  ScreenFrame,
  SectionHeading,
} from "../primitives";
import { FadeIn, Reveal } from "../reveal";

type Stage = {
  label: string;
  title: string;
  text: string;
  fact: string;
  cota: string;
  frame: string;
  src: string;
  alt: string;
  callout: {
    icon: LucideIcon;
    title: string;
    detail: string;
    tone?: "brand" | "success";
  };
};

/* Cada callout repete só o que aparece na captura correspondente. */
const STAGES: Stage[] = [
  {
    label: "Proposta",
    title: "Proposta completa, pronta para enviar",
    text: "Envie a proposta e acompanhe a negociação até a aprovação.",
    fact: "PDF com o logotipo da empresa",
    cota: "ETAPA 01 — PROPOSTA",
    frame: "NINC ERP · Proposta",
    src: "/suporte/guias/emissao-de-propostas/10-detalhe-proposta.avif",
    alt: "Resumo da proposta ORC-007/2026 no NINC ERP com o botão para baixar o PDF",
    callout: {
      icon: FileDown,
      title: "Proposta ORC-007/2026",
      detail: "PDF pronto para enviar",
    },
  },
  {
    label: "Contrato",
    title: "Aprovou, virou contrato",
    text: "A aprovação gera o contrato automaticamente. Alterações posteriores seguem por aditivo.",
    fact: "Contrato gerado na aprovação",
    cota: "ETAPA 02 — APROVAÇÃO E CONTRATO",
    frame: "NINC ERP · Proposta aprovada",
    src: "/suporte/guias/emissao-de-propostas/12-status-aprovada.avif",
    alt: "Proposta aprovada com o aviso de edição bloqueada e o botão Ver Contratos",
    callout: {
      icon: BadgeCheck,
      title: "Proposta aprovada",
      detail: "Edição bloqueada · Ver contratos",
      tone: "success",
    },
  },
  {
    label: "Recebíveis",
    title: "Parcelas no radar",
    text: "As parcelas chegam ao financeiro, com vencidos e próximos recebimentos à vista.",
    fact: "Vencidos e a vencer em uma tela",
    cota: "ETAPA 03 — CONTAS A RECEBER",
    frame: "NINC ERP · Contas a receber",
    src: "/suporte/guias/conciliacao-e-tesouraria/05-contas-a-receber.avif",
    alt: "Contas a receber com os indicadores de total a receber, vencidos e a vencer",
    callout: {
      icon: CalendarClock,
      title: "Total a receber",
      detail: "Vencidos · A vencer",
    },
  },
  {
    label: "Caixa",
    title: "Caixa conferido, conta por conta",
    text: "Confira os saldos e concilie os movimentos com o extrato bancário.",
    fact: "Posição líquida consolidada",
    cota: "ETAPA 04 — TESOURARIA E CONCILIAÇÃO",
    frame: "NINC ERP · Tesouraria",
    src: "/suporte/guias/conciliacao-e-tesouraria/06-tesouraria.avif",
    alt: "Tesouraria com disponível em caixa, investimentos, limite de cartões e posição líquida",
    callout: {
      icon: Wallet,
      title: "Posição líquida",
      detail: "Caixa + investimentos − cartões",
    },
  },
  {
    label: "Resultado",
    title: "O resultado de cada contrato",
    text: "Acompanhe receitas, despesas e saldo de cada contrato.",
    fact: "Relatórios por contrato",
    cota: "ETAPA 05 — RELATÓRIOS",
    frame: "NINC ERP · Relatórios",
    src: "/suporte/guias/conciliacao-e-tesouraria/09-relatorios.avif",
    alt: "Relatórios financeiros com receitas, despesas e saldo por contrato",
    callout: {
      icon: BarChart3,
      title: "Receitas × despesas",
      detail: "Por contrato",
      tone: "success",
    },
  },
];

const LAST = STAGES.length - 1;
const pad = (index: number) => String(index + 1).padStart(2, "0");

const NODE =
  "relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-sm transition-all duration-300";

function FactChip({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
      <Check aria-hidden="true" className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

export function FlowSection() {
  const [active, setActive] = useState(0);
  const panels = useRef<Array<HTMLDivElement | null>>([]);
  const focusPanel = useRef(false);

  // "Próxima etapa" desmonta o painel onde estava o foco: leva o foco ao painel novo.
  useEffect(() => {
    if (!focusPanel.current) return;
    focusPanel.current = false;
    panels.current[active]?.focus();
  }, [active]);

  return (
    <section
      id="fluxo"
      aria-labelledby="fluxo-titulo"
      className="relative isolate scroll-mt-20 overflow-hidden bg-gradient-to-b from-ninc-950 via-ninc-900 to-ninc-950 py-20 text-white dark:border-y dark:border-white/5 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <BlueprintGrid tone="dark" className={MASK.top} />
        <div className="absolute left-1/2 top-1/3 h-[32rem] w-[48rem] max-w-none -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-ninc-500/30 blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
        <NincMonogram
          size={420}
          aria-hidden="true"
          className="absolute -left-24 bottom-0 text-white/[0.035] motion-safe:animate-[spin_120s_linear_infinite] dark:text-white/[0.035]"
        />
      </div>

      <Container>
        <Reveal>
          <SectionHeading
            id="fluxo-titulo"
            tone="dark"
            eyebrow="Fluxo"
            title="Uma linha contínua do comercial ao financeiro."
            description="Acompanhe o caminho da proposta ao resultado. Cada etapa alimenta a próxima."
          >
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ninc-100/[.55]">
              Capturas reais do sistema · dados de demonstração
            </p>
          </SectionHeading>
        </Reveal>

        {/* Desktop: trilho com 5 nós (abas Radix: setas do teclado, aria-selected/controls). */}
        <Tabs
          value={String(active)}
          onValueChange={(value) => setActive(Number(value))}
          className="mt-16 hidden lg:block"
        >
          <TabsList
            aria-label="Etapas do fluxo"
            className="relative grid h-auto grid-cols-5 gap-0 bg-transparent p-0 text-inherit"
          >
            <span
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-[30px] border-t border-dashed border-white/20"
            />
            <span
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-[29px] h-0.5"
            >
              <span
                className="block h-full origin-left rounded-full bg-gradient-to-r from-sky-300 to-emerald-300 ease-out motion-safe:transition-transform motion-safe:duration-700"
                style={{ transform: `scaleX(${active / LAST})` }}
              />
            </span>
            {STAGES.map((stage, index) => {
              const isActive = index === active;
              const done = index < active;
              return (
                <TabsTrigger
                  key={stage.label}
                  value={String(index)}
                  className={cn(
                    "group flex flex-col items-center gap-3 whitespace-normal rounded-2xl bg-transparent p-2 text-center shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    FOCUS_DARK,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      NODE,
                      isActive
                        ? "border-white bg-white text-ninc-900 ring-4 ring-sky-300/25"
                        : done
                          ? "border-sky-300/60 bg-ninc-950 text-sky-200"
                          : "border-white/20 bg-ninc-950 text-ninc-100/80 group-hover:border-white/50 group-hover:text-white",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : pad(index)}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isActive
                        ? "text-white"
                        : "text-white/70 group-hover:text-white",
                    )}
                  >
                    {stage.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="-mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ninc-100/60"
                  >
                    Etapa {pad(index)}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {STAGES.map((stage, index) => (
            <TabsContent
              key={stage.label}
              value={String(index)}
              ref={(node) => {
                panels.current[index] = node;
              }}
              className={cn("mt-12 rounded-3xl", FOCUS_DARK)}
            >
              <FadeIn className="grid grid-cols-12 items-center gap-10">
                <div className="col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-200/80">
                    Etapa {pad(index)} / {pad(LAST)}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white [text-wrap:balance] lg:text-3xl">
                    {stage.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ninc-100/80">
                    {stage.text}
                  </p>
                  <div className="mt-5">
                    <FactChip>{stage.fact}</FactChip>
                  </div>
                  {index < LAST && (
                    <button
                      type="button"
                      onClick={() => {
                        focusPanel.current = true;
                        setActive(index + 1);
                      }}
                      className={cn(
                        "group mt-8 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-sky-200 transition-colors hover:text-white",
                        FOCUS_DARK,
                      )}
                    >
                      Próxima etapa
                      <span className="sr-only">
                        : {STAGES[index + 1].label}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
                      />
                    </button>
                  )}
                </div>

                <div className="relative col-span-8">
                  <Cota label={stage.cota} tone="dark" className="mb-4" />
                  <ScreenFrame
                    src={assetPath(stage.src)}
                    alt={stage.alt}
                    label={stage.frame}
                    tone="dark"
                  />
                  <Callout
                    icon={stage.callout.icon}
                    title={stage.callout.title}
                    detail={stage.callout.detail}
                    tone={stage.callout.tone}
                    className="absolute -bottom-6 -left-6"
                  />
                </div>
              </FadeIn>
            </TabsContent>
          ))}
        </Tabs>

        {/* Mobile/tablet: linha vertical com todas as etapas. */}
        <div className="relative mt-12 lg:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[21px] top-2 w-px bg-gradient-to-b from-sky-300/60 via-white/[.15] to-transparent"
          />
          <ol className="space-y-12 pl-14">
            {STAGES.map((stage, index) => (
              <Reveal as="li" key={stage.label} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    NODE,
                    "absolute -left-14 top-0 border-sky-300/60 bg-ninc-950 text-sky-200",
                  )}
                >
                  {pad(index)}
                </span>
                <p className="flex min-h-[2.75rem] items-center font-mono text-[11px] uppercase tracking-[0.2em] text-sky-200/80">
                  Etapa {pad(index)} — {stage.label}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white [text-wrap:balance]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ninc-100/80">
                  {stage.text}
                </p>
                <div className="mt-4">
                  <FactChip>{stage.fact}</FactChip>
                </div>
                <ScreenFrame
                  src={assetPath(stage.src)}
                  alt={stage.alt}
                  label={stage.frame}
                  tone="dark"
                  className="mt-5"
                />
                <Callout
                  icon={stage.callout.icon}
                  title={stage.callout.title}
                  detail={stage.callout.detail}
                  tone={stage.callout.tone}
                  className="mt-3 w-fit max-w-full"
                />
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <CtaLink
            href="#apresentacao"
            variant="light"
            size="lg"
            arrow
            className="w-full sm:w-auto"
          >
            Ver a plataforma em ação
          </CtaLink>
        </Reveal>
      </Container>
    </section>
  );
}
