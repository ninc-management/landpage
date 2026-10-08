import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { LandingPage } from "./landing-page";


// jsdom não implementa IntersectionObserver (whileInView do framer-motion) nem matchMedia
beforeAll(() => {
  (global as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  if (!window.matchMedia) {
    (window as any).matchMedia = (query: string) => ({
      matches: query === "(min-width: 768px)",
      media: query,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
    });
  }
});


describe("LandingPage", () => {
  it("shows real testimonials and the presentation without pricing or trial promises", async () => {
    render(await LandingPage());
    expect(document.getElementById("planos")).toBeNull();
    expect(document.querySelector('a[href="/signup"]')).toBeNull();
    expect(document.querySelector('a[href="/login"]')).toBeNull();
    expect(screen.queryByText(/30 dias grátis/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Assistir à apresentação/ }),
    ).toBeInTheDocument();
    for (const name of [
      "Lucas Costa",
      "Ingrid Vitória",
      "Natanael Filho",
    ]) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
  });
  it("renders one coherent page without querying pricing", () => {
    render(<LandingPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo");
    const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'), script => JSON.parse(script.innerHTML));
    const brand = schemas.find(schema => schema['@graph']);
    const publicationUrl = new URL(process.env.NINC_SITE_URL || 'https://ninc.digital/').href;
    expect(brand['@graph'].find((entity: { '@type': string }) => entity['@type'] === 'WebSite').url).toBe(publicationUrl);
    expect(document.querySelector('noscript')).not.toBeNull();
    expect(screen.getByAltText(/painel inicial do ninc erp/i)).toHaveAttribute('fetchpriority', 'high');

    // Toda âncora interna (header, rodapé, CTAs) aponta para um id que existe, e nenhum id se repete.
    const anchors = new Set(
      Array.from(document.querySelectorAll('a[href^="#"]'), (a) =>
        a.getAttribute("href")!.slice(1),
      ),
    );
    for (const id of Array.from(anchors))
      expect(document.getElementById(id)).not.toBeNull();
    const ids = Array.from(document.querySelectorAll("[id]"), (el) => el.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });
});
