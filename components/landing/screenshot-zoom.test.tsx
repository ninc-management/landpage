import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { ScreenFrame } from "./primitives";

it("opens the full uncropped capture, enlarges it and restores focus when closed", async () => {
  render(
    <ScreenFrame
      src="/suporte/guias/primeiros-passos/01-painel.avif"
      alt="Painel financeiro"
      label="NINC ERP · Painel"
      imgClassName="aspect-square"
    />,
  );
  const trigger = screen.getByRole("button", {
    name: "Ampliar captura: Painel financeiro",
  });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "NINC ERP · Painel" });
  const capture = within(dialog).getByRole("img", {
    name: "Painel financeiro",
  });
  expect(capture).toHaveAttribute(
    "src",
    "/suporte/guias/primeiros-passos/01-painel.avif",
  );
  expect(capture).not.toHaveClass("aspect-square");
  const zoom = within(dialog).getByRole("button", {
    name: "Ver tamanho original",
  });
  fireEvent.click(zoom);
  expect(
    within(dialog).getByRole("button", { name: "Ajustar à tela" }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  expect(trigger).toHaveFocus();
});
