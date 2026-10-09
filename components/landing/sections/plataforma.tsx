import { assetPath } from "@/lib/assets";
import Link from "next/link";
import { ArrowRight, Building2, Camera, Check, FileText, Landmark, Receipt, Users, type LucideIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container, FOCUS, ScreenFrame, Section, SectionHeading } from "@/components/landing/primitives";
import { FadeIn } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

type TourTab = {
  value: string;
  label: string;
  icon: LucideIcon;
  frame: string;
  title: string;
  body: string;
  bullets: string[];
  src: string;
  alt: string;
};

/** Módulos do tour. Cada aba mostra uma captura real (1440×900) com dados de demonstração. */
const TABS: TourTab[] = [
  {
    value: "propostas",
    label: "Propostas",
    icon: FileText,
    frame: "NINC ERP · Propostas",
    title: "Todas as negociações à vista",
    body: "Acompanhe cada proposta do rascunho à aprovação, com totais e abas por status em uma só tela.",
    bullets: [
      "Status Enviada, Em Negociação e Aprovada",
      "Crie do zero ou a partir de um modelo salvo",
      "Numeração e resumo de cada proposta",
    ],
    src: "/suporte/guias/emissao-de-propostas/03-lista-propostas.avif",
    alt: "Lista de propostas do NINC ERP com totais e abas por status",
  },
  {
    value: "cadastros",
    label: "Clientes e itens",
    icon: Users,
    frame: "NINC ERP · Itens e serviços",
    title: "Cadastre uma vez, use em todas as propostas",
    body: "Clientes, fornecedores e o catálogo de itens e serviços alimentam propostas, contratos e lançamentos.",
    bullets: [
      "Clientes e fornecedores juntos em Parceiros",
      "Catálogo com unidade e preço de cada item",
      "Na proposta, o valor do item já vem preenchido",
    ],
    src: "/suporte/guias/emissao-de-propostas/02-novo-item.avif",
    alt: "Cadastro de item do catálogo com unidade base e preço final",
  },
  {
    value: "lancamentos",
    label: "Lançamentos",
    icon: Receipt,
    frame: "NINC ERP · Lançamentos",
    title: "Entradas e saídas com rastreabilidade",
    body: "Receitas, despesas e saldo previsto no topo; na tabela, cada lançamento mostra a qual contrato pertence.",
    bullets: [
      "Filtros por parceiro, categoria e status",
      "Lançamento vinculado à parcela do contrato",
      "Unidade de negócio, centro de custo e categoria em cada registro",
    ],
    src: "/suporte/guias/conciliacao-e-tesouraria/02-lancamentos.avif",
    alt: "Lançamentos financeiros com totais de receitas, despesas e saldo previsto",
  },
  {
    value: "contas",
    label: "Contas financeiras",
    icon: Landmark,
    frame: "NINC ERP · Contas financeiras",
    title: "Todas as contas da empresa em um cadastro",
    body: "Contas correntes, aplicações e caixa físico, cada uma com saldo inicial, somadas automaticamente na Tesouraria.",
    bullets: [
      "Contas por organização e tipo",
      "Saldo inicial para começar do número certo",
      "Base para conciliar com o extrato do banco",
    ],
    src: "/suporte/guias/conciliacao-e-tesouraria/01-contas-financeiras.avif",
    alt: "Cadastro de nova conta financeira com saldo inicial",
  },
  {
    value: "empresa",
    label: "Dados da empresa",
    icon: Building2,
    frame: "NINC ERP · Empresa",
    title: "Os dados certos em todos os documentos",
    body: "Grupo econômico e organização principal preenchidos uma vez e usados em propostas e contratos.",
    bullets: [
      "Grupo econômico e organização principal",
      "Razão social, CNPJ e contatos conferidos",
      "Informações aplicadas aos documentos emitidos",
    ],
    src: "/suporte/guias/primeiros-passos/04-dados-empresa.avif",
    alt: "Formulário com os dados do grupo econômico e da organização principal",
  },
];

const TICKS_MINOR =
  "[background-image:linear-gradient(to_right,rgb(16_38_168/0.25)_1px,transparent_1px)] [background-size:12px_100%] dark:[background-image:linear-gradient(to_right,rgb(255_255_255/0.35)_1px,transparent_1px)]";
const TICKS_MAJOR =
  "[background-image:linear-gradient(to_right,rgb(16_38_168/0.4)_1px,transparent_1px)] [background-size:60px_100%] dark:[background-image:linear-gradient(to_right,rgb(255_255_255/0.5)_1px,transparent_1px)]";

/** Tour em abas pelos módulos do dia a dia, com capturas reais. Servidor; as abas (Radix) hidratam sozinhas. */
export function ProductTour() {
  return (
    <Section id="plataforma" className="overflow-x-clip bg-white dark:bg-ninc-950">
      <Container>
        <SectionHeading
          id="plataforma-titulo"
          align="center"
          eyebrow="Plataforma"
          title="As telas que a sua equipe vai usar todo dia."
          description="Navegue pelos módulos e veja como o NINC organiza a rotina comercial e financeira de uma empresa de projetos."
        >
          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-ninc-200 bg-ninc-50 px-3 py-1 text-xs font-semibold text-ninc-700 dark:border-white/10 dark:bg-ninc-800/40 dark:text-ninc-200">
            <Camera aria-hidden="true" className="h-3.5 w-3.5" />
            Capturas reais do sistema
          </p>
        </SectionHeading>

        <Tabs defaultValue={TABS[0].value} className="mt-12">
          {/* Régua: abaixo de lg sangra até a borda e rola dentro do próprio wrapper, nunca a página. */}
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] max-lg:[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
            <TabsList
              aria-label="Módulos do NINC ERP"
              className="inline-flex h-auto w-max min-w-full justify-start gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 dark:border-white/10 dark:bg-white/[0.03] sm:justify-center"
            >
              {TABS.map(({ value, label, icon: Icon }, index) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={cn(
                    "group gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-white/70 hover:text-slate-900 dark:text-ninc-100/70 dark:hover:bg-white/5 dark:hover:text-white",
                    "data-[state=active]:bg-white data-[state=active]:text-ninc-800 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200 dark:data-[state=active]:bg-ninc-800/70 dark:data-[state=active]:text-white dark:data-[state=active]:ring-white/10",
                    FOCUS
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 text-slate-400 transition-colors group-data-[state=active]:text-ninc-600 dark:text-ninc-100/50 dark:group-data-[state=active]:text-ninc-300"
                  />
                  {label}
                  <span aria-hidden="true" className="font-mono text-[10px] tabular-nums opacity-50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-2 h-3 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          >
            <div className={cn("absolute inset-x-0 top-0 h-2 opacity-60 dark:opacity-30", TICKS_MINOR)} />
            <div className={cn("absolute inset-x-0 top-0 h-3 opacity-60 dark:opacity-30", TICKS_MAJOR)} />
          </div>

          {TABS.map(({ value, icon: Icon, frame, title, body, bullets, src, alt }) => (
            <TabsContent key={value} value={value} className={cn("mt-10 rounded-3xl", FOCUS)}>
              <FadeIn className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="order-2 lg:order-1 lg:col-span-4">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-xl bg-ninc-50 text-ninc-700 ring-1 ring-ninc-100 dark:bg-ninc-800/50 dark:text-ninc-300 dark:ring-white/10"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 [text-wrap:balance] dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600 dark:text-ninc-100/70">{body}</p>
                  <ul className="mt-6 space-y-3">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700 dark:text-ninc-100/80">
                        <Check
                          aria-hidden="true"
                          className="mt-px h-5 w-5 shrink-0 rounded-full bg-emerald-50 p-1 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#apresentacao"
                    className={cn(
                      "group mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-ninc-700 transition-colors hover:text-ninc-800 dark:text-ninc-300 dark:hover:text-ninc-200",
                      FOCUS
                    )}
                  >
                    Ver apresentação
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="relative isolate order-1 lg:order-2 lg:col-span-8">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-ninc-100/70 to-sky-100/40 blur-2xl dark:from-ninc-700/30 dark:to-sky-500/10 sm:-inset-6"
                  />
                  <ScreenFrame src={assetPath(src)} alt={alt} label={frame} />
                  <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-ninc-100/60">
                    Captura real · dados de demonstração
                  </p>
                </div>
              </FadeIn>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
}
