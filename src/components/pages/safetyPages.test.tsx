import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhotosPage } from "./photosPage";
import { PrivacyPage } from "./privacyPage";

describe("Sicherheitsseiten", () => {
  it.each([
    ["Datenschutz", PrivacyPage],
    ["Fotos", PhotosPage],
  ])("verwendet für %s dieselbe Warnungsposition und Farbe", (_, Page) => {
    const { container } = render(<Page />);
    const page = container.querySelector(".safety-page");
    const children = Array.from(page?.children ?? []);
    const notice = screen.getByRole("note");

    expect(page).toBeInTheDocument();
    expect(children[0]).toHaveClass("safety-header");
    expect(children[1]).toBe(notice);
    expect(notice).toHaveClass("alert", "alert-warning", "safety-notice");
    expect(children[2]).toHaveClass("safety-content");
    expect(container.querySelectorAll(".safety-card")).toHaveLength(4);
  });
});
