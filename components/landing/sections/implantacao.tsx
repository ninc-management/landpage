import { assetPath } from "@/lib/assets";
import type { ReactNode } from "react";
import { ArrowRight, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, FOCUS, Section, SectionHeading } from "../primitives";
import { Stagger, StaggerItem } from "../reveal";
import { ScreenshotZoom } from "../screenshot-zoom";

/**
 * Mini moldura de captura real. As telas são 1440×900 com destaques do guia;
 * `zoom` (scale + origin) recorta a área útil — medida sobre os pixels de cada imagem.
 */
function MiniShot({
  src,
  alt,
  label,
  zoom,
}: {
  src: string;
  alt: string;
  label: string;
  zoom: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgba(6,13,61,0.45)] dark:border-white/10 dark:bg-white/[0.04]">
      <div
        aria-hidden="true"
        className="flex h-7 items-center gap-2.5 border-b border-slate-200/80 px-3 dark:border-white/10"
      >
        <span className="flex shrink-0 gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/25"
            />
          ))}
        </span>
        <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-ninc-100/60">
          {label}
        </span>
      </div>
      <ScreenshotZoom
        src={assetPath(src)}
        alt={alt}
        title={label}
        className="relative aspect-[16/10] overflow-hidden rounded-none bg-ninc-50"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(src)}
          alt={alt}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 ease-out dark:brightness-[0.94]",
            zoom,
          )}
        />
      </ScreenshotZoom>
    </figure>
  );
}

type Step = {
  title: string;
  text: string;
  visual: ReactNode;
};

const STEPS: Step[] = [
  {
    title: "Organize os dados da sua empresa",
    text: "Reúna os dados da empresa, dos clientes e dos serviços que você oferece para organizar tudo em um só lugar.",
    visual: (
      <MiniShot
        src={assetPath("/suporte/guias/primeiros-passos/01-painel.avif")}
        alt="Painel da plataforma NINC ERP"
        label="NINC ERP · Painel"
        zoom="origin-top scale-100"
      />
    ),
  },
  {
    title: "Coloque a sua marca e a equipe",
    text: "Envie o logotipo, escolha as cores, complete os dados da empresa e convide os colaboradores com o nível de permissão certo.",
    visual: (
      <MiniShot
        src={assetPath("/suporte/guias/primeiros-passos/03-identidade-visual.avif")}
        alt="Configuração da identidade visual com logotipo e cores da empresa"
        label="NINC ERP · Identidade visual"
        // Card destacado ocupa x 265–1174 / y 165–526: 1.5× centrado nele.
        zoom="origin-[50%_30%] scale-150 motion-safe:group-hover:scale-[1.56]"
      />
    ),
  },
  {
    title: "Emita a primeira proposta",
    text: "Cadastre o cliente e os itens, monte a proposta e baixe o PDF pronto para enviar.",
    visual: (
      <MiniShot
        src={assetPath("/suporte/guias/emissao-de-propostas/10-detalhe-proposta.avif")}
        alt="Proposta ORC-007/2026 com o botão Baixar PDF"
        label="NINC ERP · Proposta"
        // Conteúdo em x 126–1334: corta as margens e mantém o topo (título e Baixar PDF).
        zoom="origin-top scale-[1.15] motion-safe:group-hover:scale-[1.2]"
      />
    ),
  },
];

export function GetStarted() {
  return (
    <Section id="implantacao" className="bg-white dark:bg-ninc-950">
      <Container>
        <SectionHeading
          id="implantacao-titulo"
          align="center"
          eyebrow="FL. 09 — Implantação"
          title="Configure hoje. Envie a primeira proposta ainda hoje."
          description="Sem projeto de implantação e sem consultoria obrigatória. São três passos, e a Central de Suporte acompanha cada um deles."
        />

        <div className="relative mt-14">
          {/* Conectores tracejados passando pelo centro dos números (aparecem nos vãos entre os cards). */}
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-[3.25rem] hidden border-t-2 border-dashed border-ninc-200 dark:border-ninc-800 lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[3.25rem] top-8 border-l-2 border-dashed border-ninc-200 dark:border-ninc-800 lg:hidden"
          />

          <Stagger as="ol" className="relative grid gap-6 lg:grid-cols-3">
            {STEPS.map(({ title, text, visual }, index) => (
              <StaggerItem
                as="li"
                key={title}
                className="relative rounded-3xl bg-white dark:bg-ninc-950"
              >
                <div className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-ninc-900/5 hover:ring-ninc-300 motion-safe:hover:-translate-y-0.5 dark:bg-ninc-900/50 dark:ring-white/10 dark:hover:ring-ninc-400/40">
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-ninc-700 font-mono text-xl font-bold text-white shadow-lg shadow-ninc-700/30"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    <span className="sr-only">Passo {index + 1}: </span>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">
                    {text}
                  </p>
                  <div className="mt-auto pt-6">{visual}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-ninc-200 bg-ninc-50/60 p-5 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:p-6">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-ninc-700 shadow-sm ring-1 ring-ninc-200 dark:bg-ninc-900 dark:text-ninc-300 dark:ring-white/10"
          >
            <LifeBuoy className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-950 dark:text-white">
              Você não fica sozinho.
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">
              A Central de Suporte dentro do sistema tem guias passo a passo,
              perguntas frequentes e um canal de feedback direto com o nosso
              time.
            </p>
          </div>
          <a
            href="mailto:suporte@ninc.digital"
            className={cn(
              "group inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ninc-700 ring-1 ring-ninc-200 transition-colors hover:bg-ninc-50 hover:ring-ninc-300 dark:bg-white/5 dark:text-ninc-300 dark:ring-white/10 dark:hover:bg-white/10 sm:ml-auto",
              FOCUS,
            )}
          >
            suporte@ninc.digital
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
            />
          </a>
        </div>
      </Container>
    </Section>
  );
}
