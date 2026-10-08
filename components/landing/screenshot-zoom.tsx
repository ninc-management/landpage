"use client";

import { assetPath } from "@/lib/assets";


import { useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mantém o recorte da miniatura e abre o arquivo completo, inclusive no celular. */
export function ScreenshotZoom({
  src,
  alt,
  title = "Captura do NINC ERP",
  className,
  children,
}: {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  const [originalSize, setOriginalSize] = useState(false);
  return (
    <Dialog.Root onOpenChange={() => setOriginalSize(false)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Ampliar captura: ${alt}`}
          className={cn(
            "group/zoom relative block w-full cursor-zoom-in overflow-hidden rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2",
            className,
          )}
        >
          {children}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-ninc-950/90 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors group-hover/zoom:bg-ninc-700"
          >
            <ZoomIn className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ampliar</span>
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ninc-950/75 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] flex max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-[1440px] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-slate-950 shadow-2xl sm:gap-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Dialog.Title className="text-sm font-semibold sm:text-lg">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-slate-500 sm:text-sm">
                {alt}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Fechar captura"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ninc-600"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div
            tabIndex={originalSize ? 0 : undefined}
            aria-label="Captura ampliada; use as setas para percorrer os detalhes"
            className="max-h-[calc(100dvh-13rem)] overflow-auto overscroll-contain rounded-xl border border-slate-200 bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ninc-600"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath(src)}
              alt={alt}
              className={
                originalSize
                  ? "block max-w-none"
                  : "mx-auto block max-h-[calc(100dvh-13rem)] max-w-full object-contain"
              }
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              aria-pressed={originalSize}
              onClick={() => setOriginalSize((value) => !value)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ninc-50 px-4 text-sm font-medium text-ninc-700 hover:bg-ninc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ninc-600"
            >
              {originalSize ? (
                <Minimize2 aria-hidden="true" className="h-4 w-4" />
              ) : (
                <ZoomIn aria-hidden="true" className="h-4 w-4" />
              )}
              {originalSize ? "Ajustar à tela" : "Ver tamanho original"}
            </button>
            <p className="text-xs text-slate-500">
              {originalSize
                ? "Arraste ou role para ver os detalhes."
                : "Toque em tamanho original para ler os detalhes."}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
