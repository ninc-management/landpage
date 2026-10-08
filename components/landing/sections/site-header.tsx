"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NincLogo } from "@/components/ninc-logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Container, FOCUS_DARK, ctaClassName } from "../primitives";

const NAV = [
  { label: "Fluxo", href: "#fluxo" },
  { label: "Plataforma", href: "#plataforma" },
  { label: "Financeiro", href: "#financeiro" },
  { label: "IA", href: "#ia" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const skipFocusReturn = useRef(false);
  const closeOnNavigate = () => {
    skipFocusReturn.current = true;
    setOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ninc-950/[.85] text-white backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a
          href="#inicio"
          aria-label="NINC ERP — página inicial"
          className={cn("rounded-md", FOCUS_DARK)}
        >
          <NincLogo size="sm" />
        </a>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-ninc-100/80 transition-colors hover:bg-white/5 hover:text-white",
                FOCUS_DARK,
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#apresentacao"
            className={ctaClassName("light", "sm", "hidden sm:inline-flex")}
          >
            Ver apresentação
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-lg text-ninc-100/80 hover:bg-white/10 lg:hidden",
                  FOCUS_DARK,
                )}
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                if (skipFocusReturn.current) event.preventDefault();
                skipFocusReturn.current = false;
              }}
              className="flex w-[88vw] max-w-sm flex-col gap-0 overflow-y-auto border-white/10 bg-ninc-950 p-6 text-white [&>button:last-child]:hidden"
            >
              <div className="flex items-center justify-between gap-4">
                <NincLogo size="sm" />
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <SheetClose
                  aria-label="Fechar menu"
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-lg hover:bg-white/10",
                    FOCUS_DARK,
                  )}
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </SheetClose>
              </div>
              <nav aria-label="Menu" className="mt-8">
                <ul>
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={closeOnNavigate}
                        className={cn(
                          "block rounded-md border-b border-white/10 py-4 text-lg font-medium text-ninc-100/90 hover:text-white",
                          FOCUS_DARK,
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href="#apresentacao"
                onClick={closeOnNavigate}
                className={ctaClassName("light", "lg", "mt-8")}
              >
                Ver apresentação
              </a>
              <a
                href="mailto:suporte@ninc.digital"
                className={cn(
                  "mt-6 w-fit rounded-md text-sm text-ninc-100/80 hover:text-white",
                  FOCUS_DARK,
                )}
              >
                suporte@ninc.digital
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
