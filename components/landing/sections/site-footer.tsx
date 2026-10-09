import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { NincLogo, NincMonogram } from "@/components/ninc-logo";
import { cn } from "@/lib/utils";
import { Container, FOCUS } from "../primitives";
import { Stagger, StaggerItem } from "../reveal";

const EMAIL = "suporte@ninc.digital";

type FooterColumn = { id: string; title: string; links: Array<{ label: string; href: string }> };

const COLUMNS: FooterColumn[] = [
  {
    id: "rodape-produto",
    title: "Produto",
    links: [
      { label: "Fluxo", href: "#fluxo" },
      { label: "Plataforma", href: "#plataforma" },
      { label: "Propostas", href: "#propostas" },
      { label: "Financeiro", href: "#financeiro" },
      { label: "Equipe e segurança", href: "#equipe" },
      { label: "IA conectada (MCP)", href: "#ia" },
      { label: "Depoimentos", href: "#depoimentos" },
    ],
  },
  {
    id: "rodape-aprenda",
    title: "Aprenda",
    links: [
      { label: "Perguntas frequentes", href: "#duvidas" },
      { label: "Apresentação", href: "#apresentacao" },
    ],
  },
  {
    id: "rodape-conta",
    title: "Contato",
    links: [
      { label: "Fale com a gente", href: `mailto:${EMAIL}` },
    ],
  },
];

const LINK = cn(
  "rounded-sm text-slate-700 transition-colors hover:text-ninc-700 dark:text-ninc-100/80 dark:hover:text-white",
  FOCUS
);

/** Rotas via next/link; âncoras e mailto via <a>. */
function FooterLink({ label, href }: { label: string; href: string }) {
  return /^(#|mailto:)/.test(href) ? (
    <a href={href} className={LINK}>
      {label}
    </a>
  ) : (
    <Link href={href} className={LINK}>
      {label}
    </Link>
  );
}

/** Rodapé: promessa, mapa do site, contato e barra legal em forma de carimbo. */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50">
      {/* Filete de luz no topo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ninc-500/40 to-transparent dark:via-sky-300/30"
      />

      <Container className="pb-12 pt-16">
        <Stagger className="grid gap-12 lg:grid-cols-12">
          <StaggerItem className="lg:col-span-4">
            <NincLogo size="md" variant="blue" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">
              Gestão comercial e financeira para empresas de serviços de engenharia e projetos. Do orçamento ao
              fechamento do mês.
            </p>
            <div className="mt-4">
              <a
                href={`mailto:${EMAIL}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-ninc-700 transition-colors hover:text-ninc-800 dark:text-ninc-300 dark:hover:text-white",
                  FOCUS
                )}
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </StaggerItem>

          <StaggerItem className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {COLUMNS.map((column) => (
              <nav key={column.id} aria-labelledby={column.id}>
                <p
                  id={column.id}
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-ninc-100/60"
                >
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </StaggerItem>
        </Stagger>
      </Container>

      {/* Assinatura editorial — recortada pelo footer, nunca gera scroll horizontal */}
      <div aria-hidden="true" className="select-none overflow-hidden">
        <p className="-mb-[3vw] text-center text-[26vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-ninc-700/[0.07] dark:text-white/[0.04] lg:-mb-12 lg:text-[18rem]">
          ninc
        </p>
      </div>

      {/* Barra legal (carimbo): gap-px sobre fundo = filetes perfeitos em 1, 2 ou 4 colunas */}
      <Container className="relative pb-8">
        <div className="grid gap-px border border-slate-300 bg-slate-300 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:border-white/[.15] dark:bg-white/[.15] dark:text-ninc-100/60 sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex min-h-[2.75rem] items-center gap-2 bg-slate-50 px-4 py-3 dark:bg-ninc-950">
            <NincMonogram size={14} aria-hidden="true" />
            <span>© {new Date().getFullYear()} NINC ERP</span>
          </p>
          <p className="flex min-h-[2.75rem] items-center bg-slate-50 px-4 py-3 dark:bg-ninc-950">
            Serviços de Engenharia e Projetos
          </p>
          <p className="flex min-h-[2.75rem] items-center bg-slate-50 px-4 py-3 normal-case tracking-[0.08em] dark:bg-ninc-950">
            {EMAIL}
          </p>
          <a
            href="#inicio"
            className={cn(
              "group flex min-h-[2.75rem] items-center justify-between gap-2 bg-slate-50 px-4 py-3 transition-colors hover:bg-white hover:text-ninc-700 dark:bg-ninc-950 dark:hover:bg-ninc-900 dark:hover:text-white",
              FOCUS
            )}
          >
            Voltar ao topo
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
