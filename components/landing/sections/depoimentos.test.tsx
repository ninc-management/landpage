import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { TestimonialsSection } from "./depoimentos";
import testimonials from "../testimonials.json";

let desktop = true;
beforeEach(() => {
  jest.useFakeTimers();
  desktop = true;
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query === "(min-width: 768px)" && desktop,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
});
afterEach(() => {
  jest.useRealTimers();
});

const names = () =>
  screen
    .getAllByRole("article")
    .map((card) => within(card).getByRole("heading").textContent);

it("shows three reviews on desktop and replaces them every eight seconds", () => {
  render(<TestimonialsSection />);
  expect(names()).toEqual(testimonials.slice(0, 3).map((t) => t.name));
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(7999);
  });
  expect(names()).toEqual(testimonials.slice(0, 3).map((t) => t.name));
  act(() => {
    jest.advanceTimersByTime(1);
  });
  expect(names()).toEqual(testimonials.slice(1, 4).map((t) => t.name));
  for (const testimonial of testimonials.slice(1, 4)) {
    const card = screen
      .getAllByRole("article")
      .find((card) =>
        within(card).queryByRole("heading", { name: testimonial.name }),
      )!;
    expect(within(card).getByText(testimonial.quote)).toBeInTheDocument();
    expect(
      within(card).getByRole("img", { name: `Foto de ${testimonial.name}` }),
    ).toHaveAttribute("src", testimonial.photo);
    expect(
      within(card).getByRole("img", { name: `${testimonial.rating} de 5 estrelas` }),
    ).toBeInTheDocument();
  }
  act(() => {
    jest.advanceTimersByTime(8000 * (testimonials.length - 1));
  });
  expect(names()).toEqual(testimonials.slice(0, 3).map((t) => t.name));
});

it("shows one review at a time on mobile and rotates through every person with their rating", () => {
  desktop = false;
  render(<TestimonialsSection />);
  for (const testimonial of testimonials) {
    expect(names()).toEqual([testimonial.name]);
    expect(
      screen.getByRole("img", { name: `Foto de ${testimonial.name}` }),
    ).toHaveAttribute("src", testimonial.photo);
    expect(
      screen.getByRole("img", { name: `${testimonial.rating} de 5 estrelas` }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("article")).getByText(testimonial.quote),
    ).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(8000);
    });
  }
  expect(names()).toEqual([testimonials[0].name]);
});

it("pauses changes while a reader focuses the reviews and clears timers on unmount", () => {
  const { unmount } = render(<TestimonialsSection />);
  const reviews = screen.getByLabelText(/Depoimentos de usuários/);
  fireEvent.focus(reviews);
  act(() => {
    jest.advanceTimersByTime(12000);
  });
  expect(names()).toEqual(testimonials.slice(0, 3).map((t) => t.name));
  fireEvent.blur(reviews);
  act(() => {
    jest.advanceTimersByTime(8000);
  });
  expect(names()).toEqual(testimonials.slice(1, 4).map((t) => t.name));
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

it("keeps reading paused after a tap until the reader chooses to resume", () => {
  render(<TestimonialsSection />);
  const reviews = screen.getByLabelText(/Depoimentos de usuários/);
  fireEvent.click(reviews);
  fireEvent.blur(reviews);
  expect(screen.getByRole("status")).toHaveTextContent("Leitura pausada");
  act(() => {
    jest.advanceTimersByTime(16000);
  });
  expect(names()).toEqual(testimonials.slice(0, 3).map((t) => t.name));
  fireEvent.click(reviews);
  expect(screen.getByRole("status")).toHaveTextContent(
    "Troca automática a cada 8 segundos",
  );
  act(() => {
    jest.advanceTimersByTime(8000);
  });
  expect(names()).toEqual(testimonials.slice(1, 4).map((t) => t.name));
});

it("supports persistent pause and resume from the keyboard", () => {
  render(<TestimonialsSection />);
  const reviews = screen.getByLabelText(/Depoimentos de usuários/);
  fireEvent.keyDown(reviews, { key: "Enter" });
  fireEvent.blur(reviews);
  act(() => {
    jest.advanceTimersByTime(16000);
  });
  expect(names()).toEqual(testimonials.slice(0, 3).map((t) => t.name));
  fireEvent.keyDown(reviews, { key: " " });
  act(() => {
    jest.advanceTimersByTime(8000);
  });
  expect(names()).toEqual(testimonials.slice(1, 4).map((t) => t.name));
});
