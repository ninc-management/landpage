"use client";

import { assetPath } from "@/lib/assets";


import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Container, FOCUS, Section, SectionHeading } from "../primitives";
import { NincLogo } from "@/components/ninc-logo";

const VIDEO_URL = "https://www.youtube.com/watch?v=7CYZmLV0ShY";

export function PresentationVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <Section id="apresentacao" className="border-y border-slate-200 bg-white">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            id="apresentacao-titulo"
            eyebrow="Conheça o NINC ERP"
            title="Veja a sua operação ganhar forma."
            description="Uma apresentação da plataforma que conecta propostas, contratos e o financeiro da sua empresa."
          />
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex w-fit items-center gap-2 rounded-md text-sm font-medium text-ninc-700 underline-offset-4 hover:underline ${FOCUS}`}
          >
            Abrir no YouTube{" "}
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <div className="relative mx-auto mt-10 aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_24px_64px_-32px_rgba(30,35,30,0.3)] sm:rounded-3xl">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              title="Apresentação da plataforma NINC ERP"
              src="https://www.youtube-nocookie.com/embed/7CYZmLV0ShY?autoplay=1&rel=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Assistir à apresentação da plataforma NINC ERP"
              className={`group absolute inset-0 h-full w-full overflow-hidden text-white ${FOCUS}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath("/suporte/guias/primeiros-passos/01-painel.avif")}
                alt=""
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-ninc-950 via-ninc-950/90 to-ninc-950/30"
              />
              <span className="absolute inset-0 flex flex-col items-start justify-center p-4 text-left sm:p-8 lg:p-12">
                <NincLogo size="sm" className="w-24 sm:w-36" />
                <span className="mt-3 max-w-md text-xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl lg:text-5xl">
                  Conheça o NINC ERP
                </span>
                <span className="mt-2 hidden text-base text-ninc-100 sm:block lg:text-lg">
                  Propostas, contratos e financeiro conectados.
                </span>
                <span className="mt-4 inline-flex items-center gap-3 sm:mt-6 lg:mt-8">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ninc-700 shadow-xl transition-transform motion-safe:group-hover:scale-110 sm:h-14 sm:w-14">
                    <Play
                      aria-hidden="true"
                      className="ml-0.5 h-4 w-4 fill-current sm:h-6 sm:w-6"
                    />
                  </span>
                  <span className="text-sm font-semibold sm:text-base">
                    Assistir à apresentação
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      </Container>
    </Section>
  );
}
