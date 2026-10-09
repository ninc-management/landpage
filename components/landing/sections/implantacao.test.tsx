import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { GetStarted } from "./implantacao";

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

describe("GetStarted", () => {
  it("renders the three ordered steps with real guide durations, support strip and signup CTA", () => {
    render(<GetStarted />);

    const section = screen.getByRole("region", { name: "Configure hoje. Envie a primeira proposta ainda hoje." });
    expect(section).toHaveAttribute("id", "implantacao");
    expect(screen.getByText("Implantação")).toBeInTheDocument();

    const steps = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(steps).toHaveLength(3);
    expect(steps.map((li) => within(li).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "Passo 1: Organize os dados da sua empresa",
      "Passo 2: Coloque a sua marca e a equipe",
      "Passo 3: Emita a primeira proposta",
    ]);

    expect(screen.getByAltText("Proposta ORC-007/2026 com o botão Baixar PDF")).toHaveAttribute(
      "src",
      "/suporte/guias/emissao-de-propostas/10-detalhe-proposta.avif"
    );

    expect(screen.getByRole("link", { name: /suporte@ninc\.digital/ })).toHaveAttribute(
      "href",
      "mailto:suporte@ninc.digital"
    );
    expect(document.querySelector('a[href="/signup"]')).toBeNull();
  });
});
