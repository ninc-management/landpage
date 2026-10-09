import { assetPath } from "@/lib/assets";
import {
  Copy,
  FilePlus2,
  LayoutList,
  Palette,
  type LucideIcon,
} from "lucide-react";
import {
  BlueprintGrid,
  Container,
  Cota,
  CtaLink,
  FOCUS,
  GradientText,
  MASK,
  ScreenFrame,
  Section,
  SectionHeading,
} from "@/components/landing/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";
import { ScreenshotZoom } from "../screenshot-zoom";

const IMG = "/suporte/guias/emissao-de-propostas";

type Step = {
  title: string;
  text: string;
  src: string;
  alt: string;
  /** Ponto de zoom da miniatura (a captura inteira a 96px é ilegível; aproxima a área destacada). */
  focus: string;
};

// Etapas e textos conferidos no guia "Emissão de Propostas" e nas próprias capturas.
const STEPS: Step[] = [
  {
    title: "Informações básicas",
    text: "Cliente, emissor e assunto. Os dados do cliente aparecem para conferência.",
    src: `${IMG}/04-informacoes-basicas.avif`,
    alt: "Etapa de informações básicas da proposta com cliente e assunto principal",
    focus: "origin-[8%_18%]",
  },
  {
    title: "Layout e apresentação",
    text: "Escolha o modelo visual e escreva os textos de abertura e encerramento.",
    src: `${IMG}/05-apresentacao.avif`,
    alt: "Etapa de layout e apresentação com o modelo visual e o texto de fechamento",
    focus: "origin-[8%_25%]",
  },
  {
    title: "Equipe e escopo",
    text: "Quem participa do projeto e as atividades de cada etapa.",
    src: `${IMG}/06-equipe-escopo.avif`,
    alt: "Etapa de equipe e escopo da proposta",
    focus: "origin-[8%_30%]",
  },
  {
    title: "Itens e preços",
    text: "Itens do catálogo com quantidades, subtotal e total calculados na hora.",
    src: `${IMG}/07-itens-precos.avif`,
    alt: "Etapa de itens e preços com 1.200 m² e subtotal de R$ 54.000,00",
    focus: "origin-[20%_62%]",
  },
  {
    title: "Condições de pagamento",
    text: "Entrada e parcelas que fecham em 100% do valor da proposta.",
    src: `${IMG}/08-condicoes-pagamento.avif`,
    alt: "Condições de pagamento com 30% na assinatura e 70% em três parcelas, totalizando 100%",
    focus: "origin-[15%_50%]",
  },
  {
    title: "Ressalvas",
    text: "Validade, reajuste e o que não está incluso, registrados antes de salvar.",
    src: `${IMG}/09-ressalvas-salvar.avif`,
    alt: "Etapa de ressalvas e condições com o botão Salvar Proposta",
    focus: "origin-[85%_90%]",
  },
];

const EXTRAS: Array<{ icon: LucideIcon; text: string }> = [
  { icon: Copy, text: "Salvar como modelo" },
  { icon: LayoutList, text: "Ordem e visibilidade das seções do PDF" },
  { icon: FilePlus2, text: "Aditivos pela página do contrato" },
];

/** Miniatura de captura 16:10 com zoom na área relevante (cresce no hover do `group`). */
function Thumb({
  src,
  alt,
  focus,
  className,
}: {
  src: string;
  alt: string;
  focus: string;
  className?: string;
}) {
  return (
    <ScreenshotZoom
      src={assetPath(src)}
      alt={alt}
      className={cn(
        "shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-ninc-50 shadow-sm dark:border-white/10",
        className,
      )}
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
          "block aspect-[16/10] w-full scale-[1.4] object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.55] dark:brightness-[0.94]",
          focus,
        )}
      />
    </ScreenshotZoom>
  );
}

/** Comercial: as seis etapas da proposta, o PDF com a marca da empresa e a identidade visual. */
export function ProposalsSection() {
  return (
    <Section
      id="propostas"
      className="isolate border-y border-slate-200/70 bg-slate-50/70 dark:border-white/5 dark:bg-ninc-900/30"
    >
      <BlueprintGrid className={MASK.topRight} />

      {/* Mobile: título → PDF → etapas. lg: título e etapas à esquerda, palco fixo (sticky) à direita. */}
      <Container className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <SectionHeading
          className="lg:col-span-5"
          id="propostas-titulo"
          eyebrow="Comercial"
          title={
            <>
              Propostas{" "}
              <GradientText tone="light">à altura do projeto</GradientText> que
              você entrega.
            </>
          }
          description="Do escopo às condições de pagamento: monte a proposta em seis etapas e envie um PDF com a sua marca."
        />

        <div className="mx-auto w-full max-w-md self-start sm:max-w-2xl lg:sticky lg:top-24 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:max-w-none">
          {/* Mobile: só o PDF, sem rotação. sm+: tela de itens atrás, PDF na frente. */}
          <div className="relative sm:aspect-[16/12]">
            <div
              aria-hidden="true"
              className="absolute inset-[12%] -z-10 rounded-full bg-ninc-300/40 blur-3xl dark:bg-ninc-500/20"
            />

            <Reveal
              y={24}
              scale={0.98}
              className="absolute right-0 top-0 hidden w-[80%] sm:block"
            >
              <ScreenFrame
                src={assetPath(`${IMG}/07-itens-precos.avif`)}
                alt="Tela de itens e preços da proposta com subtotal e total"
                label="NINC ERP · Itens e preços"
                className="rotate-[2.5deg] opacity-90"
              />
            </Reveal>

            <Reveal
              y={32}
              scale={0.98}
              delay={0.12}
              className="relative sm:absolute sm:bottom-0 sm:left-0 sm:w-[46%]"
            >
              {/*
                aspect < 16:10 corta só as laterais: em 4/5 sobra a folha (x 340–1099 da captura) sem o cinza
                lateral do visualizador; no mobile, 1/1 mantém uma margem cinza fina e não fica alto demais.
              */}
              <ScreenFrame
                src={assetPath(`${IMG}/11-pdf.avif`)}
                alt="PDF da proposta com o logotipo da empresa, apresentação, equipe e descrição do serviço"
                label="NINC ERP · PDF da proposta"
                className="shadow-2xl shadow-ninc-950/30 transition-transform duration-500 sm:-rotate-[1.5deg] sm:motion-safe:hover:rotate-0"
                imgClassName="aspect-square object-center sm:aspect-[4/5]"
              />
              <p className="absolute -top-3 left-4 z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-lg dark:border-emerald-400/20 dark:bg-ninc-950 dark:text-emerald-300 sm:-right-10 sm:left-auto sm:top-14">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Aprovada · contrato gerado
              </p>
            </Reveal>
          </div>

          <Cota label="Proposta → PDF com a sua marca" className="mt-6" />
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          <div className="relative">
            {/* Traço que liga as miniaturas: passa por trás delas e aparece nos intervalos. */}
            <span
              aria-hidden="true"
              className="absolute bottom-10 left-[3.25rem] top-10 w-px bg-gradient-to-b from-ninc-300 via-slate-200 to-transparent dark:from-ninc-400/50 dark:via-white/10 sm:left-[3.75rem]"
            />
            <Stagger
              as="ol"
              aria-label="Etapas da proposta"
              className="relative space-y-2"
            >
              {STEPS.map((step, index) => (
                <StaggerItem
                  key={step.title}
                  as="li"
                  className="group relative flex gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-slate-200 hover:bg-white dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
                >
                  <Thumb
                    src={assetPath(step.src)}
                    alt={step.alt}
                    focus={step.focus}
                    className="w-20 self-start sm:w-24"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ninc-700 dark:text-ninc-300">
                      Etapa {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-ninc-100/70">
                      {step.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="mt-8 flex items-start gap-3 rounded-2xl border border-ninc-200 bg-ninc-50/70 p-4 text-sm dark:border-ninc-500/30 dark:bg-ninc-500/10">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ninc-700 text-white shadow-md shadow-ninc-700/25 dark:bg-ninc-500"
            >
              <Palette className="h-4 w-4" />
            </span>
            {/* Guia "Primeiros passos": o logotipo vem da identidade visual; as cores do PDF, do layout da proposta. */}
            <p className="min-w-0 flex-1 leading-relaxed text-slate-700 dark:text-ninc-100/80">
              <strong className="font-semibold text-slate-950 dark:text-white">
                Sua marca em tudo:
              </strong>{" "}
              logotipo, cores e textos próprios nos documentos enviados ao
              cliente.
            </p>
            <Thumb
              src={assetPath("/suporte/guias/primeiros-passos/03-identidade-visual.avif")}
              alt="Identidade visual com logotipo e cores primária e secundária"
              focus="origin-[30%_30%]"
              className="hidden w-24 rounded-md sm:block"
            />
          </Reveal>

          <ul
            aria-label="Recursos da proposta"
            className="mt-6 flex flex-wrap gap-2"
          >
            {EXTRAS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-ninc-100/80"
              >
                <Icon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-ninc-600 dark:text-ninc-300"
                />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink href="#apresentacao" arrow>
              Ver apresentação
            </CtaLink>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-ninc-100/70">
            Veja como a plataforma faz parte da rotina de quem já usa.{" "}
            <a
              href="#depoimentos"
              className={cn(
                "rounded font-semibold text-ninc-700 underline decoration-ninc-300 underline-offset-4 hover:decoration-ninc-700 dark:text-ninc-300 dark:decoration-ninc-300/40 dark:hover:decoration-ninc-300",
                FOCUS,
              )}
            >
              Leia os depoimentos
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
