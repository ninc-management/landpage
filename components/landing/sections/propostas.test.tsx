import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ProposalsSection } from "./propostas";

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

describe("ProposalsSection", () => {
  it("renders the six proposal steps, the PDF stage and both CTAs", () => {
    render(<ProposalsSection />);

    const section = screen.getByRole("region", { name: "Propostas à altura do projeto que você entrega." });
    expect(section).toHaveAttribute("id", "propostas");
    expect(screen.getByText("FL. 05 — Comercial")).toBeInTheDocument();

    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Informações básicas",
      "Layout e apresentação",
      "Equipe e escopo",
      "Itens e preços",
      "Condições de pagamento",
      "Ressalvas",
    ]);

    expect(
      screen.getByAltText("PDF da proposta com o logotipo da empresa, apresentação, equipe e descrição do serviço")
    ).toHaveAttribute("src", "/suporte/guias/emissao-de-propostas/11-pdf.avif");
    expect(screen.getByAltText("Identidade visual com logotipo e cores primária e secundária")).toBeInTheDocument();
    for (const img of screen.getAllByRole("img")) expect(img).toHaveAttribute("loading", "lazy");
    expect(screen.getByText("Aprovada · contrato gerado")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Ver apresentação" })).toHaveAttribute("href", "#apresentacao");
    expect(screen.getByRole("link", { name: "Leia os depoimentos" })).toHaveAttribute("href", "#depoimentos");
  });
});
