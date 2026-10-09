import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { FaqSection } from "./duvidas";

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

describe("FaqSection", () => {
  it("renders the FAQ accordion, support contact and FAQPage JSON-LD", () => {
    const { container } = render(<FaqSection />);

    expect(screen.getByRole("region", { name: "Perguntas frequentes" })).toHaveAttribute("id", "duvidas");
    expect(screen.getByText("Dúvidas")).toBeInTheDocument();

    const first = screen.getByRole("button", { name: "Para que tipo de empresa o NINC foi feito?" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/micro e pequenas empresas/)).toBeInTheDocument();

    const team = screen.getByRole("button", { name: "Posso controlar o que cada pessoa da equipe vê?" });
    fireEvent.click(team);
    expect(team).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(/Cada colaborador tem o próprio acesso/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "O que dá para fazer com o Claude ou o ChatGPT conectados?" }));
    expect(screen.getByRole("link", { name: "servidor MCP da NINC" })).toHaveAttribute("href", "#ia");

    expect(screen.getByRole("link", { name: "suporte@ninc.digital" })).toHaveAttribute(
      "href",
      "mailto:suporte@ninc.digital"
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    const schema = JSON.parse(script?.innerHTML ?? "{}");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(12);
    expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(11);
    expect(JSON.stringify(schema)).not.toMatch(/30 dias|plano Básico|Planos/);
  });
});
