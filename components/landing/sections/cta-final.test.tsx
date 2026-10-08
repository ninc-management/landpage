import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { FinalCta } from "./cta-final";

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

describe("FinalCta", () => {
  it("renders the offer, CTAs, contact and the flow recap", () => {
    render(<FinalCta />);

    const section = screen.getByRole("region", { name: "Uma operação conectada. Do início ao fim." });
    expect(section).toHaveAttribute("id", "cta-final");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "cta-final-titulo");
    expect(screen.getByText("Do orçamento ao fechamento")).toBeInTheDocument();

    expect(document.querySelector('a[href="/signup"]')).toBeNull();
    expect(screen.getByRole("link", { name: "suporte@ninc.digital" })).toHaveAttribute(
      "href",
      "mailto:suporte@ninc.digital"
    );


    const recap = screen.getAllByRole("list").find((list) => list.tagName === "OL")!;
    expect(within(recap).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "Proposta aprovada01",
      "Contrato gerado02",
      "Parcelas no financeiro03",
      "Mês conciliado04",
    ]);
  });
});
