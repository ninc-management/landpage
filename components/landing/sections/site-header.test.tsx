import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./site-header";


beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }
});

beforeEach(() => {
  Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
});

const HREFS = ["#fluxo", "#plataforma", "#financeiro", "#ia", "#depoimentos", "#duvidas"];

describe("SiteHeader", () => {
  it("renders brand, anchor nav and account CTAs", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "NINC ERP — página inicial" })).toHaveAttribute("href", "#inicio");

    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(HREFS);

    expect(screen.getByRole("link", { name: /Ver apresentação/ })).toHaveAttribute("href", "#apresentacao");
    expect(screen.getByAltText(/NINC ERP/)).toHaveClass("brightness-0", "invert");
  });

  it("has no theme toggle", () => {
    render(<SiteHeader />);
    expect(screen.queryByRole("button", { name: /Ativar tema/ })).not.toBeInTheDocument();
  });

  it("opens the mobile menu with every section and closes on navigation", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));

    const dialog = screen.getByRole("dialog", { name: "Menu de navegação" });
    const menu = within(dialog).getByRole("navigation", { name: "Menu" });
    expect(within(menu).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(HREFS);
    expect(within(dialog).getByRole("link", { name: /Ver apresentação/ })).toHaveAttribute("href", "#apresentacao");
    expect(within(dialog).getByRole("link", { name: "suporte@ninc.digital" })).toHaveAttribute(
      "href",
      "mailto:suporte@ninc.digital"
    );

    fireEvent.click(within(menu).getByRole("link", { name: "Depoimentos" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not introduce trial or account buttons after scrolling", () => {
    render(<SiteHeader />);
    expect(screen.queryByText("Sem cartão de crédito no cadastro")).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 900;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.queryByText("Sem cartão de crédito no cadastro")).not.toBeInTheDocument();
    expect(document.querySelector('a[href="/signup"]')).toBeNull();
  });
});
