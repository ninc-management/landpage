import {
  ArrowLeftRight,
  BarChart3,
  CalendarCheck,
  CreditCard,
  FileBadge,
  FileSignature,
  FileText,
  FileUp,
  HandCoins,
  Landmark,
  ListChecks,
  PieChart,
  Receipt,
  ShieldCheck,
  Target,
  UserCog,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BlueprintGrid, Container, Crosshairs, Eyebrow, MASK, Section } from "@/components/landing/primitives";
import { Stagger, StaggerItem } from "@/components/landing/reveal";

const AUDIENCE = [
  "Escritórios de engenharia",
  "Arquitetura",
  "Projetos complementares",
  "Consultorias técnicas",
  "Laudos e vistorias",
  "Gerenciamento de projetos",
];

const SPECS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: CalendarCheck,
    title: "Operação conectada",
    text: "Propostas, contratos e financeiro no mesmo ambiente.",
  },
  {
    icon: FileText,
    title: "PDF com a sua marca",
    text: "Propostas com o logotipo e as cores da sua empresa, prontas para enviar.",
  },
  {
    icon: Landmark,
    title: "Conciliação bancária",
    text: "Extrato por arquivo OFX ou conexão com o banco via Open Finance.",
  },
  {
    icon: ShieldCheck,
    title: "Acesso protegido",
    text: "Senha, código por e-mail ou aplicativo autenticador.",
  },
];

const MODULES: Array<[string, LucideIcon]> = [
  ["Propostas comerciais", FileText],
  ["PDF com a sua marca", FileBadge],
  ["Contratos", FileSignature],
  ["Lançamentos", ListChecks],
  ["Contas a pagar e receber", Receipt],
  ["Cobranças", HandCoins],
  ["Cartões de crédito", CreditCard],
  ["Tesouraria", Wallet],
  ["Conciliação bancária", ArrowLeftRight],
  ["Importação OFX", FileUp],
  ["Centros de custo", Target],
  ["Rateio de custos", PieChart],
  ["Fechamento de período", CalendarCheck],
  ["Relatórios gerenciais", BarChart3],
  ["Permissões por perfil", UserCog],
];

/** Rótulo mono centralizado, com traço dos dois lados. */
function CenterLabel({ children }: { children: string }) {
  return (
    <Eyebrow className="justify-center text-center text-slate-500 dark:text-ninc-100/60">
      {children}
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
    </Eyebrow>
  );
}

/** "Para quem é": qualifica o visitante, fixa quatro fatos do produto e mostra a lista de módulos. */
export function AudienceStrip() {
  return (
    <Section
      id="publico"
      className="isolate bg-white pb-20 pt-36 dark:bg-ninc-950 sm:pb-28 sm:pt-56 lg:pb-28 lg:pt-72"
    >
      <BlueprintGrid className={MASK.top} />
      <h2 id="publico-titulo" className="sr-only">
        Para quem é o NINC
      </h2>

      <Container>
        {/* 1. Público */}
        <CenterLabel>Feito para quem vive de projeto</CenterLabel>
        <Stagger as="ul" y={8} stagger={0.05} className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {AUDIENCE.map((item) => (
            <StaggerItem
              key={item}
              as="li"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/[0.03] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-ninc-100/80 dark:shadow-none"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ninc-600 dark:bg-ninc-300" />
              {item}
            </StaggerItem>
          ))}
        </Stagger>

        {/* 2. Folha de especificações */}
        <div className="group relative mx-auto mt-14 max-w-6xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-1/2 -z-10 h-32 -translate-y-1/2 rounded-full bg-sky-300/[.15] blur-3xl dark:bg-sky-400/10"
          />
          <Crosshairs />
          <Stagger
            as="ul"
            className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-[0_24px_48px_-28px_rgba(6,13,61,0.25)] dark:border-white/10 dark:bg-white/10 dark:shadow-none sm:grid-cols-2 lg:grid-cols-4"
          >
            {SPECS.map(({ icon: Icon, title, text }) => (
              <StaggerItem
                key={title}
                as="li"
                className="group/cell relative bg-white p-5 transition-colors duration-300 hover:bg-slate-50/80 dark:bg-ninc-950 dark:hover:bg-ninc-900/60 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ninc-600 via-ninc-400 to-transparent group-hover/cell:scale-x-100 motion-safe:transition-transform motion-safe:duration-500 dark:from-ninc-300 dark:via-sky-300/60"
                />
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-ninc-50 text-ninc-700 ring-1 ring-ninc-100 transition-colors duration-300 group-hover/cell:bg-ninc-700 group-hover/cell:text-white group-hover/cell:ring-ninc-700 dark:bg-ninc-800/50 dark:text-ninc-200 dark:ring-white/10 dark:group-hover/cell:bg-ninc-600 dark:group-hover/cell:ring-ninc-500"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* 3. Lista de módulos */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <CenterLabel>Tudo em um só sistema</CenterLabel>
          <Stagger
            as="ul"
            y={8}
            stagger={0.035}
            aria-label="Módulos do NINC ERP"
            className="flex max-w-5xl flex-wrap justify-center gap-2"
          >
            {MODULES.map(([label, Icon]) => (
              <StaggerItem
                key={label}
                as="li"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-700 ring-1 ring-slate-200 dark:bg-white/5 dark:text-ninc-100/80 dark:ring-white/10 sm:text-sm"
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-ninc-600 dark:text-ninc-300" />
                {label}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
