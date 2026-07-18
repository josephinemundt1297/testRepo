import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { playDate } from "../domain/playdates";
import { PlayDateCalendar } from "../components/organisms/playDateCalendar";

const date: playDate = {
  id: 1,
  title: "Abenteuer im Stadtpark",
  children: ["Mila"],
  friends: ["Noah"],
  date: "2026-07-18",
  time: "15:00",
  location: "Volkspark",
  bring: "Picknickdecke",
  status: "Bestätigt",
  color: "mint",
};

describe("PlayDateCalendar", () => {
  it("zeigt Termine samt Status im passenden Monat", () => {
    render(
      <PlayDateCalendar
        dates={[date]}
        initialMonth={new Date(2026, 6, 1, 12)}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Juli 2026" })).toBeInTheDocument();
    expect(screen.getAllByText(date.title)).toHaveLength(2);
    expect(screen.getByText("Bestätigt")).toBeInTheDocument();
  });

  it("wechselt per Tastatur-bedienbarem Button in den nächsten Monat", async () => {
    render(
      <PlayDateCalendar
        dates={[date]}
        initialMonth={new Date(2026, 6, 1, 12)}
        onEdit={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Nächster Monat" }));
    expect(screen.getByRole("heading", { name: "August 2026" })).toBeInTheDocument();
  });

  it("vergrößert einen Termin in einer modalen Detail-Ebene", async () => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
    };
    render(
      <PlayDateCalendar
        dates={[date]}
        initialMonth={new Date(2026, 6, 1, 12)}
        onEdit={vi.fn()}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: `${date.title} um ${date.time} Uhr vergrößern` }),
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("Mitbringen");
    expect(screen.getByRole("dialog")).toHaveTextContent(date.location);
  });

  it("zeigt eigene und freigegebene Geburtstage im Raster und Tagesbereich", () => {
    render(
      <PlayDateCalendar
        dates={[]}
        birthdays={[
          { id: "own", childName: "Mila", familyName: "Meine Familie", birthday: "2020-07-18", own: true },
          { id: "shared", childName: "Lina", familyName: "Familie Demo", birthday: "07-18", own: false },
        ]}
        initialMonth={new Date(2026, 6, 1, 12)}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText("Geburtstag von Mila")).toBeVisible();
    expect(screen.getByText("Eigenes Kind")).toBeVisible();
    expect(screen.getByText("Geburtstag von Lina")).toBeVisible();
    expect(screen.getByText("Familie Demo")).toBeVisible();
  });
});
