import { assetPath } from "@/lib/assets";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { NincMonogram } from "@/components/ninc-logo";
import { cn } from "@/lib/utils";
import { ScreenshotZoom } from "./screenshot-zoom";

/*
 * Blocos compartilhados da landing ("Prancha Técnica").
 * Sem hooks e sem "use client": servem tanto a seções de servidor quanto de cliente.
 */

/** Easing "traçado" usado nas animações da landing. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Anel de foco sobre fundo claro ("papel"). */
export const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ninc-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-ninc-300 dark:focus-visible:ring-offset-ninc-950";

/** Anel de foco sobre fundo azul ("blueprint", escuro nos dois temas). */
export const FOCUS_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ninc-950";

/** Máscaras prontas para <BlueprintGrid className={MASK.top} />. */
export const MASK = {
  top: "[mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]",
  topRight:
    "[mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]",
  bottomLeft:
    "[mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_70%)]",
  center:
    "[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]",
};

type Tone = "light" | "dark";

/** Largura padrão do conteúdo: max-w-7xl com gutters 16/24/32px. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}

/**
 * <section> com âncora: id, scroll-mt-20 (header sticky), ritmo py-20/28/32 e
 * aria-labelledby="{id}-titulo" (passe o mesmo id ao <SectionHeading>). Não inclui Container.
 * Sobrescreva fundo/padding via className (ex.: "bg-white dark:bg-ninc-950", "pt-36").
 */
export function Section({
  id,
  labelledBy = `${id}-titulo`,
  className,
  children,
}: {
  id: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-20 py-20 sm:py-28 lg:py-32", className)}
    >
      {children}
    </section>
  );
}

/** Rótulo mono "FL. 02 — Diagnóstico" com um traço de 32px antes. tone "dark" em fundo azul. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em]",
        tone === "dark"
          ? "text-sky-200/80"
          : "text-ninc-700 dark:text-ninc-300",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
      {children}
    </p>
  );
}

const ALIGN = {
  left: { wrap: "", eyebrow: "", lead: "" },
  center: {
    wrap: "mx-auto text-center",
    eyebrow: "justify-center",
    lead: "mx-auto",
  },
  /** À esquerda no mobile, centralizado a partir de lg. */
  "center-lg": {
    wrap: "lg:mx-auto lg:text-center",
    eyebrow: "lg:justify-center",
    lead: "lg:mx-auto",
  },
};

/**
 * Cabeçalho de seção: Eyebrow + h2 (com `id`, alvo do aria-labelledby) + lead opcional.
 * `children` entra abaixo do lead (ex.: pill "Capturas reais").
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  children,
}: {
  /** id do h2, ex.: "fluxo-titulo". */
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: keyof typeof ALIGN;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}) {
  const a = ALIGN[align];
  return (
    <div className={cn("max-w-3xl", a.wrap, className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className={a.eyebrow}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] sm:text-4xl lg:text-5xl",
          eyebrow && "mt-5",
          tone === "dark" ? "text-white" : "text-slate-950 dark:text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            a.lead,
            tone === "dark"
              ? "text-ninc-100/80"
              : "text-slate-600 dark:text-ninc-100/75",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/** Texto com gradiente. tone "dark" (padrão) para fundo azul; "light" para papel. */
export function GradientText({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        tone === "dark"
          ? "from-white via-ninc-100 to-sky-200"
          : "from-ninc-700 via-ninc-600 to-sky-600 dark:from-ninc-300 dark:via-ninc-200 dark:to-sky-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Grade técnica (40px + subgrade de 8px no tom dark). aria-hidden, absolute inset-0 -z-10:
 * o pai precisa de `relative isolate`. Passe a máscara em className (ex.: MASK.topRight).
 */
export function BlueprintGrid({
  tone = "light",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {tone === "dark" ? (
        <>
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:8px_8px]" />
        </>
      ) : (
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(16_38_168/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(16_38_168/0.06)_1px,transparent_1px)] [background-size:40px_40px] dark:[background-image:linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)]" />
      )}
    </div>
  );
}

/**
 * Fundo completo de uma prancha: grade + dois brilhos + monograma d'água opcional,
 * recortado (overflow-hidden) numa camada aria-hidden -z-10. Pai: `relative isolate`.
 * Para posições de brilho específicas do spec, componha BlueprintGrid + divs à mão.
 */
export function GridBackdrop({
  tone = "dark",
  mask = MASK.topRight,
  glows = true,
  monogram,
  className,
}: {
  tone?: Tone;
  /** Classe de máscara da grade (MASK.*). */
  mask?: string;
  glows?: boolean;
  /** Tamanho do monograma d'água (px); omita para não exibir. */
  monogram?: number;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <BlueprintGrid tone={tone} className={mask} />
      {glows && (
        <>
          <div
            className={cn(
              "absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]",
              dark ? "bg-ninc-500/40" : "bg-ninc-200/40 dark:bg-ninc-500/[.15]",
            )}
          />
          <div
            className={cn(
              "absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-3xl",
              dark ? "bg-sky-400/20" : "bg-sky-200/30 dark:bg-sky-400/10",
            )}
          />
        </>
      )}
      {monogram && (
        <NincMonogram
          size={monogram}
          className={cn(
            "absolute -bottom-20 -right-12 motion-safe:animate-[spin_120s_linear_infinite]",
            dark
              ? "text-white/[0.05] dark:text-white/[0.05]"
              : "text-ninc-700/[0.04] dark:text-white/[0.03]",
          )}
        />
      )}
    </div>
  );
}

/**
 * Quatro cantos em "L" (12px → 16px no hover do pai `group`). aria-hidden, absolute inset-0:
 * o pai precisa de `relative group`. tone "sky" para o card de plano recomendado.
 */
export function Crosshairs({
  tone = "brand",
  className,
}: {
  tone?: "brand" | "sky";
  className?: string;
}) {
  const corner = cn(
    "absolute h-3 w-3 transition-all duration-300 group-hover:h-4 group-hover:w-4",
    tone === "sky"
      ? "border-sky-300/60"
      : "border-ninc-300 dark:border-ninc-400/50",
  );
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <span className={cn(corner, "-left-2 -top-2 border-l border-t")} />
      <span className={cn(corner, "-right-2 -top-2 border-r border-t")} />
      <span className={cn(corner, "-bottom-2 -left-2 border-b border-l")} />
      <span className={cn(corner, "-bottom-2 -right-2 border-b border-r")} />
    </div>
  );
}

/** Linha de cota: |—— RÓTULO ——|. Decorativa (aria-hidden). */
export function Cota({
  label,
  tone = "light",
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  const tick = "h-3 w-px shrink-0 bg-current opacity-60";
  const line = "h-px flex-1 bg-current opacity-30";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]",
        tone === "dark"
          ? "text-sky-200/70"
          : "text-ninc-700/70 dark:text-ninc-300/70",
        className,
      )}
    >
      <span className={tick} />
      <span className={cn(line, "-ml-3")} />
      <span className="min-w-0 truncate">{label}</span>
      <span className={cn(line, "-mr-3")} />
      <span className={tick} />
    </div>
  );
}

/**
 * Moldura de janela para capturas reais (1440×900, UI clara). Barra com 3 pontos + rótulo
 * (nunca URL falsa). `priority` só no hero (eager); demais lazy.
 * imgClassName ajusta o recorte (ex.: "object-left-top", "aspect-[4/5]").
 */
export function ScreenFrame({
  src,
  alt,
  label,
  priority = false,
  tone = "light",
  className,
  imgClassName,
}: {
  src: string;
  /** Texto alternativo em pt-BR descrevendo a tela. */
  alt: string;
  /** Rótulo da barra, ex.: "NINC ERP · Painel". */
  label?: string;
  priority?: boolean;
  /** "dark" quando a moldura fica sobre fundo azul. */
  tone?: Tone;
  className?: string;
  imgClassName?: string;
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={cn(
        "rounded-2xl border p-1.5 shadow-[0_40px_80px_-24px_rgba(6,13,61,0.35)]",
        dark
          ? "border-white/10 bg-white/[0.06]"
          : "border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-white/[0.04]",
        className,
      )}
    >
      <div aria-hidden="true" className="flex h-8 items-center gap-3 px-3">
        <span className="flex shrink-0 gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                dark ? "bg-white/25" : "bg-slate-300 dark:bg-white/25",
              )}
            />
          ))}
        </span>
        {label && (
          <span
            className={cn(
              "w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.16em]",
              dark
                ? "text-ninc-100/60"
                : "text-slate-500 dark:text-ninc-100/60",
            )}
          >
            {label}
          </span>
        )}
      </div>
      <ScreenshotZoom src={assetPath(src)} alt={alt} title={label}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(src)}
          alt={alt}
          width={1440}
          height={900}
          loading={priority ? "eager" : "lazy"}
          {...(priority ? { fetchpriority: "high" } : {})}
          decoding="async"
          className={cn(
            "block aspect-[16/10] w-full rounded-xl border border-slate-200/70 bg-ninc-50 object-cover object-top dark:border-white/10 dark:brightness-[0.94]",
            imgClassName,
          )}
        />
      </ScreenshotZoom>
    </figure>
  );
}

/** Chip de vidro estático com ícone, título, badge opcional e detalhe. `children` entra abaixo do detalhe. */
export function Callout({
  icon: Icon,
  title,
  detail,
  badge,
  tone = "brand",
  className,
  children,
}: {
  icon: LucideIcon;
  title: ReactNode;
  detail?: ReactNode;
  /** Pill esmeralda ao lado do título, ex.: "Aprovada". */
  badge?: string;
  tone?: "brand" | "success";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl bg-white/95 p-3 pr-4 text-left shadow-xl ring-1 ring-slate-900/10 backdrop-blur dark:bg-ninc-900/90 dark:ring-white/10",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white",
          tone === "success" ? "bg-emerald-500" : "bg-ninc-700",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
          {title}
          {badge && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-400/[.15] dark:text-emerald-300">
              {badge}
            </span>
          )}
        </p>
        {detail && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-ninc-100/70">
            {detail}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

/**
 * Carimbo (legenda de prancha): <dl> decorativo. rows[0][0] vira o cabeçalho com o monograma;
 * as demais são [rótulo, valor]. Ex.: [["NINC ERP"], ["Folha", "01 / 12"]].
 */
export function Carimbo({
  rows,
  tone = "light",
  className,
}: {
  rows: Array<[string] | [string, string]>;
  tone?: Tone;
  className?: string;
}) {
  const [[heading], ...rest] = rows;
  const dark = tone === "dark";
  const border = dark
    ? "border-white/20"
    : "border-slate-300 dark:border-white/[.15]";
  return (
    <dl
      aria-hidden="true"
      className={cn(
        "grid grid-cols-[auto_1fr] border font-mono text-[10px] uppercase tracking-[0.16em]",
        border,
        dark
          ? "bg-ninc-950/70 text-ninc-100/70 backdrop-blur"
          : "bg-white/80 text-slate-600 dark:bg-ninc-950/60 dark:text-ninc-100/60",
        className,
      )}
    >
      <dt
        className={cn(
          "col-span-2 flex items-center gap-2 px-3 py-2 font-semibold",
          dark ? "text-white" : "text-slate-900 dark:text-white",
        )}
      >
        <NincMonogram
          size={16}
          aria-hidden="true"
          className={dark ? "text-white dark:text-white" : undefined}
        />
        {heading}
      </dt>
      {rest.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className={cn("border-r border-t px-3 py-2 opacity-70", border)}>
            {label}
          </dt>
          <dd className={cn("border-t px-3 py-2", border)}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const CTA_VARIANTS = {
  /** Papel: azul da marca. */
  primary: cn(
    "bg-ninc-700 text-white shadow-lg shadow-ninc-700/25 hover:bg-ninc-800",
    FOCUS,
  ),
  /** Papel: contorno. */
  outline: cn(
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/[.15] dark:bg-transparent dark:text-white dark:hover:bg-white/5",
    FOCUS,
  ),
  /** Blueprint: primário branco. */
  light: cn(
    "bg-white text-ninc-900 shadow-lg shadow-ninc-950/30 hover:bg-ninc-50",
    FOCUS_DARK,
  ),
  /** Blueprint: secundário translúcido. */
  "ghost-dark": cn(
    "border border-white/25 bg-white/5 text-white hover:bg-white/10",
    FOCUS_DARK,
  ),
};

const CTA_SIZES = { sm: "h-9 px-4", md: "h-11 px-6", lg: "h-12 px-7" };

export type CtaVariant = keyof typeof CTA_VARIANTS;

/** Classes de um CTA em pílula — útil com <Button asChild> ou elementos que não são links. */
export function ctaClassName(
  variant: CtaVariant = "primary",
  size: keyof typeof CTA_SIZES = "md",
  className?: string,
) {
  return cn(
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors",
    CTA_SIZES[size],
    CTA_VARIANTS[variant],
    className,
  );
}

/**
 * CTA em pílula. Rotas usam next/link; "#âncora", "mailto:" e "http" usam <a>.
 * `arrow` adiciona a seta que desliza no hover.
 */
export function CtaLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  variant?: CtaVariant;
  size?: keyof typeof CTA_SIZES;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1"
        />
      )}
    </>
  );
  const classes = ctaClassName(variant, size, className);
  return /^(#|mailto:|https?:)/.test(href) ? (
    <a href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
