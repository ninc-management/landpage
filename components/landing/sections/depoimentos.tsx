"use client";

import { assetPath } from "@/lib/assets";


import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Container, Section, SectionHeading } from "../primitives";
import testimonials from "../testimonials.json";
import styles from "./depoimentos.module.css";

const longestReview = testimonials.reduce((longest, review) =>
  review.quote.length > longest.quote.length ? review : longest,
);

function TestimonialCard({
  name,
  rating,
  quote,
  photo,
}: (typeof testimonials)[number]) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(photo)}
          alt={`Foto de ${name}`}
          width={60}
          height={60}
          loading="lazy"
          decoding="async"
          className="h-[60px] w-[60px] shrink-0 rounded-full object-cover ring-2 ring-ninc-100 ring-offset-2"
        />
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{name}</h3>
          <p className="mt-0.5 text-xs text-slate-500">Usuário do NINC ERP</p>
        </div>
      </div>
      <div
        role="img"
        aria-label={`${rating} de 5 estrelas`}
        className="mt-5 flex gap-1 text-amber-500"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            className={`h-4 w-4 ${index < rating ? "fill-current" : "text-slate-200"}`}
          />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-7 text-slate-600">
        {quote}
      </blockquote>
    </article>
  );
}

export function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [readingPaused, setReadingPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovered || focused || readingPaused || hidden;
  const toggleReading = () => {
    setHovered(false);
    setFocused(false);
    setReadingPaused((value) => !value);
  };

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateLayout = () => setVisibleCount(media.matches ? 3 : 1);
    const updateVisibility = () => setHidden(document.hidden);
    updateLayout();
    updateVisibility();
    media.addEventListener("change", updateLayout);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateLayout);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || testimonials.length <= visibleCount) return;
    const timer = window.setInterval(
      () => setOffset((value) => (value + 1) % testimonials.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, [paused, visibleCount]);

  return (
    <Section id="depoimentos" className="border-y border-slate-200 bg-slate-50">
      <Container>
        <SectionHeading
          id="depoimentos-titulo"
          eyebrow="Quem usa, conta"
          align="center"
          title="Parte da rotina de quem faz acontecer."
          description="Experiências reais de quem usa o NINC ERP para organizar propostas, contratos e o financeiro no dia a dia."
        />
        <p
          id="depoimentos-status"
          role="status"
          className="sr-only"
        >
          {readingPaused
            ? "Leitura pausada · Clique ou toque para continuar."
            : paused
              ? "Leitura pausada · Clique ou toque para manter a pausa."
              : "Troca automática a cada 8 segundos · Clique ou toque para pausar."}
        </p>
        <div
          className={`${styles.reviews} mt-12`}
          tabIndex={0}
          role="group"
          data-paused={paused || undefined}
          aria-live="off"
          aria-label="Depoimentos de usuários. Clique, toque ou pressione Enter ou Espaço para pausar ou continuar."
          aria-describedby="depoimentos-status"
          aria-keyshortcuts="Enter Space"
          onClick={toggleReading}
          onKeyDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !event.repeat &&
              (event.key === "Enter" || event.key === " ")
            ) {
              event.preventDefault();
              toggleReading();
            }
          }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            )
              setFocused(false);
          }}
        >
          <ul className={styles.grid}>
            {Array.from({ length: visibleCount }, (_, slot) => {
              const review =
                testimonials[(offset + slot) % testimonials.length];
              return (
                <li key={slot} className={styles.slot}>
                  {/* Mantém a altura do texto mais longo para evitar saltos nas trocas. */}
                  <div className={styles.reserve} aria-hidden="true">
                    <TestimonialCard {...longestReview} />
                  </div>
                  <div
                    key={`${offset}-${slot}-${visibleCount}`}
                    className={styles.animated}
                  >
                    <TestimonialCard {...review} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
