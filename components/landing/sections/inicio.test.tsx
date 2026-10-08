import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Hero } from "./inicio";

describe("Hero", () => {
  it("renders the labelled hero with h1, CTAs and real screenshots", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "inicio-titulo");
    expect(heading).toHaveTextContent("Do orçamento ao fechamento do mês, em um só sistema.");
    expect(screen.getByRole("region", { name: /do orçamento ao fechamento do mês/i })).toHaveAttribute("id", "inicio");

    expect(screen.getByRole("link", { name: "Ver apresentação" })).toHaveAttribute("href", "#apresentacao");
    expect(screen.getByRole("link", { name: "Ver como funciona" })).toHaveAttribute("href", "#fluxo");
    expect(screen.getByText("IA conectada por MCP")).toBeInTheDocument();

    const painel = screen.getByAltText(/painel inicial do ninc erp/i);
    expect(painel).toHaveAttribute("src", "/suporte/guias/primeiros-passos/01-painel.avif");
    expect(painel).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText(/pdf de uma proposta/i)).toHaveAttribute("loading", "lazy");

    expect(screen.getByText("Proposta ORC-007/2026")).toBeInTheDocument();
    expect(screen.getByText("Telas reais do NINC ERP com dados de demonstração.")).toBeInTheDocument();
  });
});
