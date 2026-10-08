import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { AudienceStrip } from "./publico";

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

describe("AudienceStrip", () => {
  it("renders the labelled section, audience chips, spec sheet and module list", () => {
    render(<AudienceStrip />);

    const section = screen.getByRole("region", { name: "Para quem é o NINC" });
    expect(section).toHaveAttribute("id", "publico");
    expect(screen.getByRole("heading", { level: 2, name: "Para quem é o NINC" })).toBeInTheDocument();

    expect(screen.getByText("Escritórios de engenharia")).toBeInTheDocument();
    expect(screen.getByText("Laudos e vistorias")).toBeInTheDocument();

    const specs = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(specs).toEqual(["Operação conectada", "PDF com a sua marca", "Conciliação bancária", "Acesso protegido"]);
    expect(screen.getByText(/Propostas, contratos e financeiro no mesmo ambiente/i)).toBeInTheDocument();

    const modules = screen.getByRole("list", { name: "Módulos do NINC ERP" });
    expect(within(modules).getAllByRole("listitem")).toHaveLength(15);
    expect(within(modules).getByText("Fechamento de período")).toBeInTheDocument();
  });
});
