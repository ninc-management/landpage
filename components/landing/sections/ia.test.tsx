import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { AiSection } from "./ia";

// jsdom não implementa IntersectionObserver (whileInView do framer-motion)
beforeAll(() => {
  (global as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("AiSection", () => {
  it("presents the MCP connection with the supported assistants, capabilities and CTAs", () => {
    render(<AiSection />);

    const section = screen.getByRole("region", { name: /Converse com o seu ERP/ });
    expect(section).toHaveAttribute("id", "ia");
    expect(screen.getByText("IA conectada (MCP)")).toBeInTheDocument();

    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();

    for (const title of [
      "Pergunte sobre o comercial",
      "Veja o financeiro em segundos",
      "Crie e edite pela conversa",
      "Baixe os documentos oficiais",
      "Organize a estrutura",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }

    expect(
      screen.getByText("Antes de criar ou alterar dados, o assistente mostra um resumo e pede a sua confirmação")
    ).toBeInTheDocument();
    expect(screen.getByText(/Model Context Protocol/)).toBeInTheDocument();
    expect(screen.getByText("Seu assistente conectado aos dados da sua empresa")).toBeInTheDocument();

    // Só o logo preto (ChatGPT) inverte no tema escuro; o do Claude mantém a cor da marca.
    const logos = section.querySelectorAll("img");
    expect(logos[0]).not.toHaveClass("dark:invert");
    expect(logos[1]).toHaveClass("dark:invert");
    expect(within(section).getByText(/Exemplo ilustrativo/)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Ver apresentação/ })).toHaveAttribute("href", "#apresentacao");
    expect(screen.getByRole("link", { name: "Ver depoimentos" })).toHaveAttribute("href", "#depoimentos");
  });
});
