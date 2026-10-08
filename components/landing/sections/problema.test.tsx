import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { ProblemSection } from "./problema";

// jsdom não implementa IntersectionObserver (whileInView do framer-motion) nem matchMedia.
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

describe("ProblemSection", () => {
  it("renders the section labelled by its h2", () => {
    render(<ProblemSection />);

    const heading = screen.getByRole("heading", { level: 2, name: /Sua empresa entrega projetos/i });
    expect(heading).toHaveAttribute("id", "problema-titulo");

    const section = screen.getByRole("region", { name: /Sua empresa entrega projetos/i });
    expect(section).toHaveAttribute("id", "problema");
    expect(screen.getByText("FL. 02 — Diagnóstico")).toBeInTheDocument();
  });

  it("maps each of the 5 pains to a NINC capability with screen-reader prefixes", () => {
    render(<ProblemSection />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(5);
    for (const item of items) {
      expect(within(item).getByText("Antes:")).toHaveClass("sr-only");
      expect(within(item).getByText("Com o NINC:")).toHaveClass("sr-only");
    }
    expect(
      screen.getByText(/o contrato é gerado automaticamente/i)
    ).toBeInTheDocument();
  });

  it("links to the flow section", () => {
    render(<ProblemSection />);
    expect(screen.getByRole("link", { name: /Veja o fluxo completo/i })).toHaveAttribute("href", "#fluxo");
  });
});
