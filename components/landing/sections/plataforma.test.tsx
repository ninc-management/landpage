import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ProductTour } from "./plataforma";

// jsdom não implementa IntersectionObserver (framer-motion) nem matchMedia.
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
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent: () => false,
    });
  }
});

describe("ProductTour", () => {
  it("renders the section labelled by its h2 with the real-screens pill", () => {
    render(<ProductTour />);

    const heading = screen.getByRole("heading", { level: 2, name: /As telas que a sua equipe vai usar todo dia/i });
    expect(heading).toHaveAttribute("id", "plataforma-titulo");
    expect(screen.getByRole("region", { name: /As telas que a sua equipe/i })).toHaveAttribute("id", "plataforma");
    expect(screen.getByText("FL. 04 — Plataforma")).toBeInTheDocument();
    expect(screen.getByText("Capturas reais do sistema")).toBeInTheDocument();
  });

  it("shows 5 module tabs with the Propostas panel active by default", () => {
    render(<ProductTour />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent?.replace(/\d+$/, ""))).toEqual([
      "Propostas",
      "Clientes e itens",
      "Lançamentos",
      "Contas financeiras",
      "Dados da empresa",
    ]);
    expect(screen.getByRole("tab", { name: "Propostas" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { level: 3, name: "Todas as negociações à vista" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Lista de propostas do NINC ERP/i })).toHaveAttribute(
      "src",
      "/suporte/guias/emissao-de-propostas/03-lista-propostas.avif"
    );
    expect(screen.getByRole("link", { name: /Ver apresentação/i })).toHaveAttribute("href", "#apresentacao");
  });

  it("switches panel when another tab is selected", () => {
    render(<ProductTour />);

    fireEvent.mouseDown(screen.getByRole("tab", { name: "Dados da empresa" }));

    expect(screen.getByRole("heading", { level: 3, name: "Os dados certos em todos os documentos" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "Todas as negociações à vista" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /grupo econômico/i })).toHaveAttribute(
      "src",
      "/suporte/guias/primeiros-passos/04-dados-empresa.avif"
    );
  });
});
