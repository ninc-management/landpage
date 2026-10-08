import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { FlowSection } from "./fluxo";

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

describe("FlowSection", () => {
  it("renders the section labelled by its h2 with the CTAs", () => {
    render(<FlowSection />);

    const heading = screen.getByRole("heading", { level: 2, name: /Uma linha contínua do comercial ao financeiro/i });
    expect(heading).toHaveAttribute("id", "fluxo-titulo");
    expect(screen.getByRole("region", { name: /Uma linha contínua/i })).toHaveAttribute("id", "fluxo");
    expect(screen.getByText("FL. 03 — Fluxo")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Ver a plataforma em ação/i })).toHaveAttribute("href", "#apresentacao");
    expect(screen.queryByRole("link", { name: /guia/i })).not.toBeInTheDocument();
  });

  it("lists the 5 stages with real screenshots on the mobile timeline", () => {
    render(<FlowSection />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(within(items[0]).getByRole("img", { name: /ORC-007\/2026/ })).toHaveAttribute(
      "src",
      "/suporte/guias/emissao-de-propostas/10-detalhe-proposta.avif"
    );
    expect(within(items[4]).getByRole("heading", { level: 3, name: "O resultado de cada contrato" })).toBeInTheDocument();
  });

  it("advances the desktop tabs with the 'Próxima etapa' button", () => {
    render(<FlowSection />);

    const tabs = within(screen.getByRole("tablist", { name: "Etapas do fluxo" })).getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByRole("heading", { level: 3 })).toHaveTextContent("Proposta completa, pronta para enviar");

    fireEvent.click(within(panel).getByRole("button", { name: /Próxima etapa/i }));

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    const next = screen.getByRole("tabpanel");
    expect(within(next).getByRole("heading", { level: 3 })).toHaveTextContent("Aprovou, virou contrato");
    expect(next).toHaveFocus();
  });
});
