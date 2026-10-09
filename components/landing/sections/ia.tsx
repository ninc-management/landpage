import { assetPath } from "@/lib/assets";
import {
  BarChart3,
  Check,
  FileDown,
  Gift,
  KeyRound,
  MessageSquareText,
  Network,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { NincMonogram } from "@/components/ninc-logo";
import { cn } from "@/lib/utils";
import {
  BlueprintGrid,
  Container,
  CtaLink,
  Eyebrow,
  GradientText,
  MASK,
  Section,
  SectionHeading,
} from "@/components/landing/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";

// Fatos conferidos no catálogo de ferramentas do MCP (mcp-tool-catalog.adapter.ts),
// no fluxo OAuth (src/interfaces/api/oauth) e na tela Configurações → Conexões de IA.

const ASSISTANTS = [
  // Só o logo monocromático (preto) inverte no escuro; o do Claude mantém o laranja da marca.
  { name: "Claude", logo: "/ai-providers/anthropic.svg", invert: false },
  { name: "ChatGPT", logo: "/ai-providers/openai.svg", invert: true },
];

type Capability = { icon: LucideIcon; title: string; text: string; prompt: string };

const CAPABILITIES: Capability[] = [
  {
    icon: Search,
    title: "Pergunte sobre o comercial",
    text: "Encontre propostas e orçamentos por cliente ou status, contratos, clientes, fornecedores e os itens e serviços do seu catálogo.",
    prompt: "Quais propostas estão aguardando aprovação?",
  },
  {
    icon: BarChart3,
    title: "Veja o financeiro em segundos",
    text: "Resumo com indicadores, fluxo de caixa projetado, DRE e relatórios por linha de produto, categoria ou contrato. Também lançamentos e contas financeiras.",
    prompt: "Como fica o fluxo de caixa dos próximos meses?",
  },
  {
    icon: PenLine,
    title: "Crie e edite pela conversa",
    text: "Monte e ajuste propostas, aprove-as (o contrato é gerado na hora), edite contratos e crie aditivos, e cadastre ou atualize clientes, fornecedores e itens. O assistente mostra um resumo e pede o seu “sim” antes de gravar.",
    prompt: "Aprove a proposta ORC-007/2026 e gere o contrato.",
  },
  {
    icon: FileDown,
    title: "Baixe os documentos oficiais",
    text: "Peça o PDF da proposta com a marca da sua empresa ou o PDF consolidado do contrato.",
    prompt: "Me envie o PDF da proposta ORC-007/2026.",
  },
  {
    icon: Network,
    title: "Organize a estrutura",
    text: "Monte unidades de negócio, centros de custo e departamentos pela conversa, com uma prévia antes de salvar.",
    prompt: "Crie o centro de custo Obras SP na unidade Engenharia.",
  },
];

const TRUST: Array<{ icon: LucideIcon; text: string }> = [
  { icon: KeyRound, text: "Autorização com o seu login NINC, sem compartilhar senha com o assistente" },
  { icon: ShieldCheck, text: "Cada pessoa só vê e faz o que o nível de permissão dela permite" },
  { icon: Check, text: "Antes de criar ou alterar dados, o assistente mostra um resumo e pede a sua confirmação" },
  { icon: Undo2, text: "Revogue o acesso quando quiser, em Configurações → Conexões de IA" },
];

const STEPS = [
  { title: "Copie a URL", text: "Em Configurações → Conexões de IA, copie a URL do servidor MCP da NINC." },
  {
    title: "Adicione a NINC",
    text: "No Claude, adicione como conector personalizado; no ChatGPT, ative o modo de desenvolvedor e crie o app. Em contas de empresa, o administrador faz esse cadastro.",
  },
  { title: "Autorize e converse", text: "Entre com o seu login NINC, autorize o acesso e comece a perguntar." },
];

function Bubble({ from, children }: { from: "user" | "assistant"; children: ReactNode }) {
  const user = from === "user";
  return (
    <div className={cn("flex gap-2.5", user && "justify-end")}>
      {!user && (
        <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ninc-700 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          user
            ? "rounded-br-md bg-ninc-700 text-white"
            : "rounded-bl-md bg-slate-100 text-slate-800 dark:bg-white/[0.06] dark:text-ninc-100/90"
        )}
      >
        <span className="sr-only">{user ? "Você: " : "Assistente: "}</span>
        {children}
      </div>
    </div>
  );
}

function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ninc-200 bg-ninc-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ninc-700 dark:border-ninc-400/30 dark:bg-ninc-400/10 dark:text-ninc-200">
      <NincMonogram size={10} aria-hidden="true" className="text-ninc-700 dark:text-ninc-200" />
      <span className="sr-only">Ação do assistente: </span>
      {children}
    </span>
  );
}

/** Conversa ilustrativa: cria uma proposta com confirmação e oferece o PDF. */
function ChatDemo() {
  return (
    <figure className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-ninc-200/60 via-sky-100/40 to-transparent blur-2xl dark:from-ninc-500/20 dark:via-sky-400/10"
      />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_80px_-24px_rgba(6,13,61,0.35)] dark:border-white/10 dark:bg-ninc-950">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquareText aria-hidden="true" className="h-4 w-4 text-ninc-700 dark:text-ninc-300" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Seu assistente de IA</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-400/[.12] dark:text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            NINC conectado
          </span>
        </div>

        <Stagger className="space-y-4 p-4 sm:p-5" stagger={0.35} y={8}>
          <StaggerItem>
            <Bubble from="user">
              Crie uma proposta para a Construtora Exemplo: projeto estrutural de 1.200 m², com 30% na assinatura e 70%
              em 3 parcelas.
            </Bubble>
          </StaggerItem>
          <StaggerItem className="space-y-2 pl-9">
            <ToolChip>Consultando clientes e itens</ToolChip>
          </StaggerItem>
          <StaggerItem>
            <Bubble from="assistant">
              <p>Montei o resumo. Confira antes de eu criar:</p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 rounded-xl border border-slate-200 bg-white p-3 text-xs dark:border-white/10 dark:bg-ninc-900/60">
                <dt className="text-slate-500 dark:text-ninc-100/60">Cliente</dt>
                <dd className="font-medium">Construtora Exemplo</dd>
                <dt className="text-slate-500 dark:text-ninc-100/60">Serviço</dt>
                <dd className="font-medium">Projeto estrutural · 1.200 m²</dd>
                <dt className="text-slate-500 dark:text-ninc-100/60">Pagamento</dt>
                <dd className="font-medium">30% na assinatura + 70% em 3×</dd>
                <dt className="text-slate-500 dark:text-ninc-100/60">Layout</dt>
                <dd className="font-medium">Padrão da empresa</dd>
              </dl>
              <p className="mt-3">Posso criar a proposta?</p>
            </Bubble>
          </StaggerItem>
          <StaggerItem>
            <Bubble from="user">Pode criar.</Bubble>
          </StaggerItem>
          <StaggerItem>
            <Bubble from="assistant">
              <p className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300">
                  <Check aria-hidden="true" className="h-4 w-4" />
                  Proposta ORC-007/2026 criada.
                </span>
              </p>
              <p className="mt-1">Quer que eu gere o PDF com a marca da sua empresa?</p>
            </Bubble>
          </StaggerItem>
        </Stagger>

        <div aria-hidden="true" className="border-t border-slate-200 p-3 dark:border-white/10">
          <div className="flex h-10 min-w-0 items-center rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-ninc-100/40">
            <span className="truncate">Pergunte qualquer coisa sobre a sua empresa…</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-slate-500 dark:text-ninc-100/60">
        Exemplo ilustrativo com dados de demonstração. As respostas variam conforme o assistente e os dados da sua
        empresa.
      </figcaption>
    </figure>
  );
}

/** IA conectada: o servidor MCP da NINC no Claude e no ChatGPT. */
export function AiSection() {
  return (
    <Section
      id="ia"
      className="isolate overflow-hidden border-y border-slate-200/70 bg-slate-50/70 dark:border-white/5 dark:bg-ninc-900/30"
    >
      <BlueprintGrid className={MASK.top} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-400/10"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="ia-titulo"
              eyebrow="IA conectada (MCP)"
              title={
                <>
                  Converse com o seu ERP. <GradientText tone="light">No Claude ou no ChatGPT.</GradientText>
                </>
              }
              description="O MCP (Model Context Protocol) é o padrão aberto que conecta assistentes de IA a sistemas como o NINC. Com o servidor MCP da NINC, o seu assistente consulta clientes, propostas, contratos e o financeiro da empresa, e cria ou ajusta propostas, cadastros e contratos quando você pede e confirma."
            >
              <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 ring-1 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-300/[.15]">
                <Gift aria-hidden="true" className="h-4 w-4 shrink-0" />
                Seu assistente conectado aos dados da sua empresa
              </p>
            </SectionHeading>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="basis-full text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-ninc-100/60 sm:basis-auto">
                Funciona com
              </span>
              {ASSISTANTS.map(({ name, logo, invert }) => (
                <span
                  key={name}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assetPath(logo)} alt="" width={16} height={16} className={cn("h-4 w-4", invert && "dark:invert")} />
                  {name}
                </span>
              ))}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-ninc-100/80">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-ninc-50 text-ninc-700 ring-1 ring-inset ring-ninc-100 dark:bg-ninc-400/10 dark:text-ninc-200 dark:ring-white/10"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* min-w-0: o placeholder truncado (nowrap) não pode alargar a coluna do grid no mobile. */}
          <Reveal y={24} scale={0.98} className="min-w-0">
            <ChatDemo />
          </Reveal>
        </div>

        {/* 5 cards: 3 + 2 no lg (grade de 6); no sm o último ocupa a linha inteira. */}
        <Stagger as="ul" className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map(({ icon: Icon, title, text, prompt }, index) => (
            <StaggerItem
              key={title}
              as="li"
              className={cn(
                index < 3 ? "lg:col-span-2" : "lg:col-span-3",
                index === CAPABILITIES.length - 1 && "sm:col-span-2",
                "group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-ninc-300 hover:shadow-xl hover:shadow-ninc-900/5 motion-safe:hover:-translate-y-0.5 dark:border-white/10 dark:bg-ninc-900/40 dark:hover:border-ninc-400/40"
              )}
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-xl bg-ninc-50 text-ninc-700 ring-1 ring-inset ring-ninc-100 dark:bg-ninc-400/10 dark:text-ninc-200 dark:ring-white/10"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/75">{text}</p>
              <p className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-xs italic leading-relaxed text-slate-600 dark:border-white/[.15] dark:bg-white/[0.03] dark:text-ninc-100/70">
                “{prompt}”
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Stepper leve, sem cards: não repete o painel de três cards da seção de equipe. */}
        <Reveal className="mt-16 border-t border-slate-200 pt-10 dark:border-white/10">
          <Eyebrow>Como conectar</Eyebrow>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Conecte sem programação
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-ninc-100/75">
            O passo a passo para cada assistente fica dentro do sistema, em Conexões de IA.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ title, text }, index) => (
              <li
                key={title}
                className="sm:border-l sm:border-slate-200 sm:pl-6 sm:first:border-l-0 sm:first:pl-0 dark:border-white/10"
              >
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full border border-ninc-200 bg-white font-mono text-xs font-semibold text-ninc-700 dark:border-ninc-400/30 dark:bg-transparent dark:text-ninc-300"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/75">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-ninc-100/75">
            No Claude, funciona nos planos Free, Pro, Max, Team e Enterprise. No ChatGPT, consulta e criação nos planos
            Business, Enterprise e Edu; no Pro, apenas consulta. No ChatGPT, a configuração é feita pelo navegador do
            computador.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <CtaLink href="#apresentacao" arrow className="w-full sm:w-auto">
              Ver apresentação
            </CtaLink>
            <CtaLink href="#depoimentos" variant="outline" className="w-full sm:w-auto">
              Ver depoimentos
            </CtaLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
