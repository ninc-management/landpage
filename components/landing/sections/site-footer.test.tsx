import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { SiteFooter } from "./site-footer";

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

describe("SiteFooter", () => {
  it("renders the sitemap, CTA, contact and legal bar without extra headings", () => {
    render(<SiteFooter />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).queryAllByRole("heading")).toHaveLength(0);

    expect(document.querySelector('a[href="/signup"]')).toBeNull();
    expect(screen.getAllByRole("link", { name: /suporte@ninc\.digital/ })[0]).toHaveAttribute(
      "href",
      "mailto:suporte@ninc.digital"
    );

    const produto = screen.getByRole("navigation", { name: "Produto" });
    expect(within(produto).getByRole("link", { name: "Depoimentos" })).toHaveAttribute("href", "#depoimentos");

    const aprenda = screen.getByRole("navigation", { name: "Aprenda" });
    expect(within(aprenda).getByRole("link", { name: "Apresentação" })).toHaveAttribute(
      "href",
      "#apresentacao"
    );

    const contato = screen.getByRole("navigation", { name: "Contato" });
    expect(within(contato).getByRole("link", { name: "Fale com a gente" })).toHaveAttribute("href", "mailto:suporte@ninc.digital");

    expect(screen.getByText(`© ${new Date().getFullYear()} NINC ERP`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Voltar ao topo/ })).toHaveAttribute("href", "#inicio");
  });
});
