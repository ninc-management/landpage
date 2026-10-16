import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
  it("lets visitors request early access through the NINC WhatsApp", () => {
    render(<FinalCta />);

    const section = screen.getByRole("region", { name: "Comece antes do lançamento. Com a NINC ao seu lado." });
    expect(section).toHaveAttribute("id", "cta-final");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "cta-final-titulo");
    expect(document.querySelector('a[href="/signup"]')).toBeNull();
    const contact = screen.getByRole("link", { name: "Solicitar meu acesso pelo WhatsApp" });
    expect(contact).toHaveAttribute(
      "href",
      "https://w.app/nincerp"
    );
    expect(contact).toHaveAttribute("target", "_blank");
    expect(contact.getAttribute("rel")).toContain("noopener");
  });
});
