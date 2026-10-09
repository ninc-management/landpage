import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { TeamSecuritySection } from "./equipe";

// jsdom não implementa IntersectionObserver (whileInView do framer-motion) nem matchMedia
beforeAll(() => {
  (global as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  if (!window.matchMedia) {
    (window as any).matchMedia = (query: string) => ({
      matches: false,
      media: query,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
    });
  }
});

describe("TeamSecuritySection", () => {
  it("renders the labelled section, feature cards with real screens and the login methods", () => {
    render(<TeamSecuritySection />);

    const section = screen.getByRole("region", { name: "Cada pessoa com o acesso certo. A sua marca em tudo." });
    expect(section).toHaveAttribute("id", "equipe");
    expect(screen.getByText("Equipe e segurança")).toBeInTheDocument();

    const cards = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(cards).toEqual([
      "Níveis de permissão por módulo",
      "Colaboradores com convite por e-mail",
      "Identidade visual da empresa",
      "Três formas de entrar com segurança",
    ]);

    expect(screen.getByAltText("Tela de níveis de permissão com o perfil Financeiro destacado")).toHaveAttribute(
      "src",
      "/suporte/guias/primeiros-passos/07-permissoes.avif"
    );
    for (const img of screen.getAllByRole("img")) expect(img).toHaveAttribute("loading", "lazy");

    expect(screen.getByText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Código por e-mail")).toBeInTheDocument();
    expect(screen.getByText("App autenticador")).toBeInTheDocument();

    // As formas de login são alternativas, não uma segunda etapa: a seção não pode prometer 2FA.
    expect(section.textContent).not.toMatch(/duas etapas|dois fatores/i);
  });
});
