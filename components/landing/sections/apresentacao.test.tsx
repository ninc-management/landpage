import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { PresentationVideo } from "./apresentacao";

it("loads the YouTube player only after the visitor chooses to watch", () => {
  const { container } = render(<PresentationVideo />);
  expect(container.querySelector("iframe")).toBeNull();
  fireEvent.click(
    screen.getByRole("button", { name: /Assistir à apresentação/ }),
  );
  expect(
    screen.getByTitle("Apresentação da plataforma NINC ERP"),
  ).toHaveAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/7CYZmLV0ShY?autoplay=1&rel=0",
  );
  expect(
    screen.getByRole("link", { name: /Abrir no YouTube/ }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=7CYZmLV0ShY");
});
