import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { FinanceSection } from "./financeiro";

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

describe("FinanceSection", () => {
  it("renders the anchored section labelled by its h2", () => {
    const { container } = render(<FinanceSection />);

    const section = container.querySelector("section#financeiro");
    expect(section).toHaveAttribute("aria-labelledby", "financeiro-titulo");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "financeiro-titulo");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/sem planilha paralela/);
  });

  it("shows the bento cards, the real screenshot and the plan comparison link", () => {
    render(<FinanceSection />);

    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(
      expect.arrayContaining([
        "Conciliação bancária sem conferência linha a linha",
        "Lançamentos com validação",
        "A liquidez da empresa em uma tela",
        "Rateio por centro de custo e unidade de negócio",
        "Relatórios gerenciais",
        "Fechamento de período",
      ])
    );

    expect(
      screen.getByAltText("Tela de conciliação bancária com os contadores de pendentes, exatos, similares e novos")
    ).toHaveAttribute("src", "/suporte/guias/conciliacao-e-tesouraria/08-conciliacao.avif");

    const statuses = within(screen.getByRole("list", { name: "Status de um lançamento" })).getAllByRole("listitem");
    expect(statuses.map((li) => li.textContent)).toEqual([
      expect.stringContaining("Pendente"),
      expect.stringContaining("Aprovado"),
      expect.stringContaining("Pago"),
    ]);

    expect(screen.getByRole("link", { name: "Leia os depoimentos" })).toHaveAttribute("href", "#depoimentos");
  });
});
