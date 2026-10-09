import { assetPath } from "@/lib/assets";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeftRight,
  BarChart3,
  CalendarClock,
  CircleCheck,
  CreditCard,
  HandCoins,
  Lock,
  PieChart,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  Container,
  Crosshairs,
  FOCUS,
  ScreenFrame,
  Section,
  SectionHeading,
} from "@/components/landing/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

const CARD = cn(
  "group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8",
  "transition-all duration-300 hover:border-ninc-300 hover:shadow-xl hover:shadow-ninc-900/5 motion-safe:hover:-translate-y-0.5",
  "dark:border-white/10 dark:bg-ninc-900/40 dark:hover:border-ninc-400/40",
);

const TRIAGE = [
  {
    label: "Equivalências exatas",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    dot: "bg-emerald-500 dark:bg-emerald-300",
  },
  {
    label: "Equivalências similares",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
    dot: "bg-amber-500 dark:bg-amber-300",
  },
  {
    label: "Movimentos novos",
    className:
      "bg-ninc-50 text-ninc-700 dark:bg-ninc-800/50 dark:text-ninc-200",
    dot: "bg-ninc-600 dark:bg-ninc-300",
  },
];

const PIPELINE = [
  {
    label: "Pendente",
    meta: "Lançado",
    metaColor: "text-slate-600 dark:text-ninc-100/70",
    pill: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-white/5 dark:text-ninc-100/80 dark:ring-white/10",
    dot: "bg-slate-400",
  },
  {
    label: "Aprovado",
    meta: "Conferido",
    metaColor: "text-ninc-700 dark:text-ninc-100/70",
    pill: "bg-ninc-50 text-ninc-800 ring-ninc-100 dark:bg-ninc-400/10 dark:text-ninc-200 dark:ring-ninc-400/20",
    dot: "bg-ninc-600 dark:bg-ninc-300",
  },
  {
    label: "Pago",
    meta: "Conta no resultado",
    metaColor: "text-emerald-700 dark:text-ninc-100/70",
    pill: "bg-emerald-50 text-emerald-800 ring-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    dot: "bg-emerald-500 dark:bg-emerald-400",
  },
];

// Sem valores: as barras só sugerem o saldo de cada bloco.
const TREASURY = [
  { label: "Disponível em caixa", bar: "w-3/4 bg-slate-300 dark:bg-white/20" },
  { label: "Investimentos", bar: "w-1/2 bg-slate-300 dark:bg-white/20" },
  { label: "Limite de cartões", bar: "w-2/5 bg-slate-300 dark:bg-white/20" },
  {
    label: "Posição líquida",
    bar: "w-full bg-gradient-to-r from-ninc-700 to-sky-400 dark:from-ninc-400 dark:to-sky-300",
  },
];

const SPLIT = [
  {
    label: "Centro de custo A",
    width: "w-1/2",
    color: "bg-ninc-700 dark:bg-ninc-400",
  },
  {
    label: "Centro de custo B",
    width: "w-[30%]",
    color: "bg-ninc-400 dark:bg-ninc-200",
  },
  { label: "Centro de custo C", width: "w-1/5", color: "bg-sky-300" },
];

const REPORT_VIEWS = [
  "Por contrato",
  "Por unidade",
  "Por centro de custo",
  "Por categoria",
  "Consolidado",
];

const SUPPORTING: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: CalendarClock,
    title: "Contas a pagar e receber",
    text: "Vencidos, a vencer e o total em aberto, para cobrar e pagar no dia certo.",
  },
  {
    icon: CreditCard,
    title: "Cartões de crédito",
    text: "Limites e gastos dos cartões corporativos dentro da posição financeira.",
  },
  {
    icon: HandCoins,
    title: "Cobranças",
    text: "Acompanhe o que foi cobrado e o que já entrou no caixa.",
  },
  {
    icon: Lock,
    title: "Fechamento de período",
    text: "Feche o mês e proteja os números que já foram conferidos.",
  },
];

const MONO =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-ninc-100/60";

/** Cabeçalho comum dos cards: ícone + tag mono, h3 e texto. */
function CardHead({
  icon: Icon,
  tag,
  title,
  children,
}: {
  icon: LucideIcon;
  tag: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ninc-50 text-ninc-700 ring-1 ring-inset ring-ninc-100 dark:bg-ninc-800/50 dark:text-ninc-200 dark:ring-white/10">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className={MONO}>{tag}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl dark:text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">
        {children}
      </p>
    </>
  );
}

/**
 * Item do bento. O card fica num div interno: o framer grava `transform` inline no <li> animado,
 * o que anularia o hover -translate-y do Tailwind. Cantos recuados para escapar do rounded-3xl.
 */
function BentoCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <StaggerItem as="li" className={cn("flex", className)}>
      <div className={cn(CARD, "w-full")}>
        <Crosshairs className="inset-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {children}
      </div>
    </StaggerItem>
  );
}

/** O financeiro como back office de verdade: bento com conciliação, validação, tesouraria, rateio e relatórios. */
export function FinanceSection() {
  return (
    <Section id="financeiro" className="bg-white dark:bg-ninc-950">
      <Container>
        <SectionHeading
          id="financeiro-titulo"
          eyebrow="Financeiro"
          title="O financeiro de uma empresa de projetos, sem planilha paralela."
          description="Saiba o que entra, o que sai e quanto cada projeto rende. Confira os movimentos e feche o mês com segurança."
        />

        <Stagger
          as="ul"
          y={20}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6"
        >
          {/* A — Conciliação */}
          <BentoCard className="md:col-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[30rem]">
            <CardHead
              icon={ArrowLeftRight}
              tag="Conciliação"
              title="Conciliação bancária sem conferência linha a linha"
            >
              Importe um OFX ou conecte o banco via Open Finance. Confira as
              correspondências sugeridas e resolva as diferenças em lote.
            </CardHead>
            <ul
              aria-label="Como o NINC separa os movimentos"
              className="mt-6 flex flex-wrap gap-2"
            >
              {TRIAGE.map((chip) => (
                <li
                  key={chip.label}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                    chip.className,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("h-1.5 w-1.5 rounded-full", chip.dot)}
                  />
                  {chip.label}
                </li>
              ))}
            </ul>
            <ScreenFrame
              src={assetPath("/suporte/guias/conciliacao-e-tesouraria/08-conciliacao.avif")}
              alt="Tela de conciliação bancária com os contadores de pendentes, exatos, similares e novos"
              label="Financeiro · Conciliação bancária"
              className="mt-6 lg:flex lg:flex-1 lg:flex-col lg:[&>button]:min-h-0 lg:[&>button]:flex-1"
              imgClassName="aspect-[16/10] object-left-top lg:aspect-auto lg:h-full"
            />
          </BentoCard>

          {/* B — Validação */}
          <BentoCard className="lg:col-span-2">
            <CardHead
              icon={CircleCheck}
              tag="Controle"
              title="Lançamentos com validação"
            >
              Lance, confira e pague. O resultado considera os valores
              efetivamente pagos.
            </CardHead>
            <ol
              aria-label="Status de um lançamento"
              className="mt-6 space-y-2 lg:mt-auto lg:pt-6"
            >
              {PIPELINE.map((step, index) => (
                <li key={step.label}>
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-full px-3.5 py-2 text-sm font-medium ring-1 ring-inset",
                      step.pill,
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-2 w-2 shrink-0 rounded-full",
                          step.dot,
                        )}
                      />
                      {step.label}
                    </span>
                    <span
                      className={cn(
                        "truncate text-xs font-normal",
                        step.metaColor,
                      )}
                    >
                      {step.meta}
                    </span>
                  </div>
                  {index < PIPELINE.length - 1 && (
                    <ArrowDown
                      aria-hidden="true"
                      className="ml-[14px] mt-2 h-3 w-3 text-slate-400 dark:text-ninc-100/40"
                    />
                  )}
                </li>
              ))}
            </ol>
          </BentoCard>

          {/* C — Tesouraria */}
          <BentoCard className="lg:col-span-2">
            <CardHead
              icon={Wallet}
              tag="Tesouraria"
              title="A liquidez da empresa em uma tela"
            >
              Veja caixa, aplicações e cartões em uma posição consolidada.
            </CardHead>
            <ul
              aria-label="Blocos da tesouraria"
              className="mt-6 grid grid-cols-2 gap-2 lg:mt-auto lg:pt-6"
            >
              {TREASURY.map((tile, index) => (
                <li
                  key={tile.label}
                  className={cn(
                    "flex min-h-[4.75rem] flex-col justify-between gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/5",
                    index === TREASURY.length - 1 &&
                      "bg-white ring-1 ring-ninc-200 dark:bg-ninc-400/5 dark:ring-ninc-400/30",
                  )}
                >
                  <span className="font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-slate-600 dark:text-ninc-100/70">
                    {tile.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn("block h-1.5 rounded-full", tile.bar)}
                  />
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* D — Rateio */}
          <BentoCard className="lg:col-span-3">
            <CardHead
              icon={PieChart}
              tag="Rateio"
              title="Rateio por centro de custo e unidade de negócio"
            >
              Distribua os custos compartilhados e conheça o resultado de cada
              frente de trabalho.
            </CardHead>
            <figure className="mt-6 lg:mt-auto lg:pt-6">
              {/* scale uniforme a partir da esquerda: numa barra de 12px lê-se como o traço sendo desenhado. */}
              <Reveal scale={0} y={0} delay={0.15} className="origin-left">
                <div
                  aria-hidden="true"
                  className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5"
                >
                  {SPLIT.map((segment) => (
                    <span
                      key={segment.label}
                      className={cn("h-full", segment.width, segment.color)}
                    />
                  ))}
                </div>
              </Reveal>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {SPLIT.map((segment) => (
                  <li
                    key={segment.label}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600 dark:text-ninc-100/70"
                  >
                    <span
                      aria-hidden="true"
                      className={cn("h-2.5 w-2.5 rounded-[3px]", segment.color)}
                    />
                    {segment.label}
                  </li>
                ))}
              </ul>
              <figcaption className="mt-3 text-[11px] text-slate-500 dark:text-ninc-100/60">
                Exemplo ilustrativo
              </figcaption>
            </figure>
          </BentoCard>

          {/* E — Relatórios */}
          <BentoCard className="lg:col-span-3">
            <CardHead
              icon={BarChart3}
              tag="Resultado"
              title="Relatórios gerenciais"
            >
              Consulte os resultados por contrato, unidade, centro de custo ou
              categoria.
            </CardHead>
            <ul
              aria-label="Visões dos relatórios"
              className="mt-6 flex flex-wrap gap-2 lg:mt-auto lg:pt-6"
            >
              {REPORT_VIEWS.map((view) => (
                <li
                  key={view}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors group-hover:border-ninc-200 dark:border-white/10 dark:bg-white/5 dark:text-ninc-100/80 dark:group-hover:border-ninc-400/30"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-ninc-500 dark:bg-ninc-300"
                  />
                  {view}
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* F — Módulos de apoio (sem moldura de card) */}
          <StaggerItem as="li" className="md:col-span-2 lg:col-span-6">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUPPORTING.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="h-full rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-colors duration-300 hover:border-ninc-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-ninc-400/40"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-ninc-700 dark:text-ninc-300"
                  />
                  <h3 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <p className="mt-8 text-sm text-slate-500 dark:text-ninc-100/60">
          Conheça a experiência de quem usa o financeiro no dia a dia.{" "}
          <a
            href="#depoimentos"
            className={cn(
              "rounded-sm font-medium text-ninc-700 underline decoration-ninc-700/30 underline-offset-4 transition-colors hover:decoration-ninc-700 dark:text-ninc-300 dark:decoration-ninc-300/30 dark:hover:decoration-ninc-300",
              FOCUS,
            )}
          >
            Leia os depoimentos
          </a>
        </p>
      </Container>
    </Section>
  );
}
