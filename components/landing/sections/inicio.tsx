import { assetPath } from "@/lib/assets";
import { BadgeCheck, CalendarClock, Check, Workflow } from "lucide-react";
import { NincMonogram } from "@/components/ninc-logo";
import { cn } from "@/lib/utils";
import { ScreenshotZoom } from "../screenshot-zoom";
import {
  BlueprintGrid,
  Callout,
  Carimbo,
  Container,
  Cota,
  CtaLink,
  GradientText,
  MASK,
  ScreenFrame,
} from "@/components/landing/primitives";

/*
 * Hero ("inicio"). Componente de servidor: a entrada é só CSS (tailwindcss-animate),
 * então o h1 e o painel (LCP) saem renderizados no servidor.
 * A seção é z-10 para o visual (que invade a próxima prancha via -mb) pintar por cima de "publico",
 * que precisa começar com pt-36 sm:pt-56 lg:pt-72. `flow-root` impede que o -mb do visual "vaze" pela
 * seção (margin collapse): sem ele o fundo azul se estenderia por baixo do visual e cobriria "publico".
 */

/** Entrada dos blocos de texto: sobe 16px e aparece. Combine com motion-safe:delay-*. */
const ENTER =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:fill-mode-both";

const MICRO_SPEC = [
  "Propostas, contratos e financeiro",
  "IA conectada por MCP",
  "Direto no navegador",
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate z-10 flow-root scroll-mt-20 bg-gradient-to-br from-ninc-950 via-ninc-900 to-ninc-700 text-white dark:border-b dark:border-white/5"
    >
      {/* Grade técnica, brilhos, monograma d'água e nome da plataforma. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <BlueprintGrid tone="dark" className={MASK.topRight} />
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-ninc-500/40 blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
        <NincMonogram
          size={560}
          className="absolute -right-40 top-24 hidden text-white/[0.04] motion-safe:animate-[spin_120s_linear_infinite] dark:text-white/[0.04] sm:block"
        />
        <p className="absolute left-4 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ninc-100/60 sm:left-8">
          NINC ERP
        </p>
      </div>

      <Container className="pt-16 sm:pt-24 lg:pt-28">
        <div className="max-w-4xl">
          <p
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/[.15] bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ninc-100 backdrop-blur sm:text-[11px]",
              ENTER,
              "motion-safe:delay-0",
            )}
          >
            <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            ERP para serviços de engenharia e projetos
          </p>

          <h1
            id="inicio-titulo"
            className={cn(
              "mt-6 text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] [text-wrap:balance] sm:text-6xl lg:text-7xl",
              ENTER,
              "motion-safe:delay-100",
            )}
          >
            Do orçamento ao{" "}
            {/* No mobile a frase quebra linha (inline); a cota só aparece a partir de sm, onde cabe inteira. */}
            {/* nowrap: o inline-block abre uma quebra antes da vírgula; mantém "mês," juntos. */}
            <span className="sm:whitespace-nowrap">
              <GradientText className="sm:relative sm:inline-block">
                fechamento do mês
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-2 hidden h-2 items-end sm:flex motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-8 motion-safe:duration-1000 motion-safe:delay-500 motion-safe:fill-mode-both"
                >
                  <span className="h-2 w-px bg-sky-300/70" />
                  <span className="h-px flex-1 bg-sky-300/60" />
                  <span className="h-2 w-px bg-sky-300/70" />
                </span>
              </GradientText>
              ,
            </span>{" "}
            em um só sistema.
          </h1>

          <p
            className={cn(
              "mt-6 max-w-2xl text-base leading-relaxed text-ninc-100/80 sm:text-lg",
              ENTER,
              "motion-safe:delay-200",
            )}
          >
            O NINC ERP conecta propostas com a sua marca, contratos automáticos
            e gestão financeira. Acompanhe sua empresa de engenharia e projetos
            do primeiro orçamento à conciliação bancária, em um só lugar.
          </p>

          <div
            className={cn(
              "mt-10 flex flex-col gap-3 sm:flex-row",
              ENTER,
              "motion-safe:delay-300",
            )}
          >
            <CtaLink
              href="#apresentacao"
              variant="light"
              size="lg"
              arrow
              className="w-full sm:w-auto"
            >
              Ver apresentação
            </CtaLink>
            <CtaLink
              href="#fluxo"
              variant="ghost-dark"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Workflow aria-hidden="true" className="h-4 w-4" />
              Ver como funciona
            </CtaLink>
          </div>

          <ul
            className={cn(
              "mt-8 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ninc-100/70 sm:flex-row sm:flex-wrap sm:gap-x-6",
              ENTER,
              "motion-safe:delay-300",
            )}
          >
            {MICRO_SPEC.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-emerald-300"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Visual: invade a prancha seguinte (-mb) — por isso a legenda usa cores de "papel". */}
      <Container className="relative z-10 mt-16 -mb-24 sm:mt-20 sm:-mb-40 lg:-mb-56">
        <div className="relative mx-auto max-w-6xl">
          <Cota
            label="Visão geral da operação"
            tone="dark"
            className="mb-4 hidden lg:flex"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 bottom-16 top-8 -z-10 rounded-[3rem] bg-ninc-500/30 blur-3xl"
          />

          <div className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-10 motion-safe:duration-1000 motion-safe:delay-300 motion-safe:fill-mode-both">
            <ScreenFrame
              src={assetPath("/suporte/guias/primeiros-passos/01-painel.avif")}
              alt="Painel inicial do NINC ERP com indicadores financeiros, comerciais e de contratos"
              label="NINC ERP · Painel"
              tone="dark"
              priority
            />

            {/* Folha do PDF: a animação fica no invólucro e a rotação/hover no cartão, para não brigarem. */}
            <div className="absolute -bottom-10 -right-4 z-20 hidden w-[30%] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-1000 motion-safe:delay-500 motion-safe:fill-mode-both md:block lg:-right-6 lg:w-[26%] xl:-right-10">
              <div className="relative rotate-2 rounded-lg bg-white p-1.5 shadow-[0_30px_60px_-15px_rgba(6,13,61,0.6)] ring-1 ring-black/5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:-translate-y-0.5 motion-safe:hover:rotate-0">
                <span className="absolute -top-2.5 left-3 z-10 rounded-full bg-ninc-700 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  PDF da proposta
                </span>
                <ScreenshotZoom
                  src={assetPath("/suporte/guias/emissao-de-propostas/11-pdf.avif")}
                  alt="Primeira página do PDF de uma proposta gerada pelo NINC ERP, com o logotipo da empresa, apresentação e equipe"
                  title="NINC ERP · PDF da proposta"
                  className="relative aspect-[8/9] overflow-hidden rounded bg-white"
                >
                  {/*
                    ponytail: recorte calibrado à mão para 11-pdf.avif (1440×900; folha em x 340–1099, a partir de y 45):
                    mostra a folha inteira com o logotipo, sem o fundo cinza do visualizador. Recalcule se a captura mudar.
                  */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/suporte/guias/emissao-de-propostas/11-pdf.avif")}
                    alt="Primeira página do PDF de uma proposta gerada pelo NINC ERP, com o logotipo da empresa, apresentação e equipe"
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="absolute left-[-46%] top-[-6%] h-auto w-[192%] max-w-none dark:brightness-[0.94]"
                  />
                </ScreenshotZoom>
              </div>
            </div>

            {/*
              Mobile: chips empilhados abaixo da tela. md+: o grid vira "contents" e o chip de aprovação
              flutua sobre o canto superior direito do painel — cobrindo o destaque do menu do usuário da captura.
            */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:contents">
              <Callout
                icon={BadgeCheck}
                tone="success"
                title="Proposta ORC-007/2026"
                badge="Aprovada"
                detail="Contrato gerado automaticamente"
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-700 motion-safe:delay-700 motion-safe:fill-mode-both md:absolute md:right-6 md:top-4 md:z-30 lg:right-16 lg:top-7"
              />
              <Callout
                icon={CalendarClock}
                title="Condições de pagamento"
                detail="30% na assinatura · 70% em 3 parcelas"
                className="md:hidden"
              >
                <div
                  aria-hidden="true"
                  className="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full"
                >
                  <span className="w-[30%] bg-ninc-600 dark:bg-ninc-400" />
                  <span className="flex-1 bg-ninc-300 dark:bg-ninc-300/40" />
                  <span className="flex-1 bg-ninc-300 dark:bg-ninc-300/40" />
                  <span className="flex-1 bg-ninc-300 dark:bg-ninc-300/40" />
                </div>
              </Callout>
            </div>

            <Carimbo
              tone="dark"
              rows={[
                ["NINC ERP"],
                ["Disciplina", "Gestão comercial e financeira"],
                ["Para", "Engenharia e projetos"],
                ["Folha", "01 / 12"],
              ]}
              className="absolute -bottom-8 -left-8 z-20 hidden w-72 shadow-2xl lg:grid"
            />
          </div>

          <p className="mt-14 text-center text-xs text-slate-500 dark:text-ninc-100/60 md:mt-16 lg:text-right">
            Telas reais do NINC ERP com dados de demonstração.
          </p>
        </div>
      </Container>
    </section>
  );
}
