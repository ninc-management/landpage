"use client";

import { createContext, useContext, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { EASE } from "./primitives";

type Tag = "div" | "ul" | "ol" | "li" | "article" | "figure" | "span";

type MotionBoxProps = HTMLAttributes<HTMLElement> & {
  /** Elemento renderizado (use "ul"/"ol"/"li" para listas válidas). Padrão "div". */
  as?: Tag;
  children?: ReactNode;
};

// ponytail: cast único para permitir `as` + atributos HTML sem brigar com os tipos do framer.
const tag = (as: Tag) => motion[as] as unknown as ElementType;

/**
 * Envolve a página: reducedMotion="user" faz o framer ignorar transforms (y/scale)
 * para quem pediu menos movimento — só a opacidade anima.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Sobe `y`px e aparece ao entrar na viewport (uma vez). `scale` inicial opcional (ex.: 0.98 para telas). */
export function Reveal({
  as = "div",
  delay = 0,
  y = 16,
  scale = 1,
  ...props
}: MotionBoxProps & { delay?: number; y?: number; scale?: number }) {
  const Comp = tag(as);
  return (
    <Comp
      data-landing-reveal=""
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...props}
    />
  );
}

const StaggerY = createContext(16);

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Contêiner que revela os filhos <StaggerItem> em sequência. `y` vale para todos os itens. */
export function Stagger({
  as = "div",
  stagger = 0.07,
  delay = 0,
  y = 16,
  ...props
}: MotionBoxProps & { stagger?: number; delay?: number; y?: number }) {
  const Comp = tag(as);
  return (
    <StaggerY.Provider value={y}>
      <Comp
        data-landing-reveal=""
        variants={container(stagger, delay)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        {...props}
      />
    </StaggerY.Provider>
  );
}

/** Item de um <Stagger>. Use as="li" dentro de listas. */
export function StaggerItem({ as = "div", ...props }: MotionBoxProps) {
  const y = useContext(StaggerY);
  const Comp = tag(as);
  return (
    <Comp
      data-landing-reveal=""
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      {...props}
    />
  );
}

/** Anima na montagem (0.35s) — para painéis de abas, que remontam a cada troca. */
export function FadeIn({ as = "div", ...props }: MotionBoxProps) {
  const Comp = tag(as);
  return (
    <Comp
      data-landing-reveal=""
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      {...props}
    />
  );
}
