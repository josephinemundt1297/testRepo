import { describe, expect, it, vi } from "vitest";
import {
  birthdaysFromConnections,
  createFamilyInvitation,
  invitationError,
  type familyConnection,
} from "./family";

describe("lokale Familienverbindungen", () => {
  it("zeigt Geburtstage ausschließlich bei angenommenen Verbindungen", () => {
    const connections: familyConnection[] = [
      { id: "1", familyName: "Demo", children: [{ name: "Lina", birthday: "2020-05-03" }], status: "Verbunden" },
      { id: "2", familyName: "Offen", children: [{ name: "Noah", birthday: "2021-06-04" }], status: "Ausstehend" },
    ];

    expect(birthdaysFromConnections(connections)).toEqual([
      { id: "1-0", familyName: "Demo", childName: "Lina", birthday: "2020-05-03" },
    ]);
  });

  it("legt einen kurzlebigen Code ohne Familiendaten im Token an", () => {
    vi.stubGlobal("crypto", { randomUUID: () => "abcd1234-0000-0000-0000-000000000000" });
    const now = new Date("2026-07-17T10:00:00.000Z");
    const invitation = createFamilyInvitation({
      familyName: "Familie Demo",
      children: [{ id: "1", name: "Lina", birthday: "2020-05-03", shareBirthday: true }],
    }, "user-1", now);

    expect(invitation.token).toBe("PD-ABCD-1234");
    expect(invitation.token).not.toContain("Lina");
    expect(invitation.expiresAt).toBe("2026-07-18T10:00:00.000Z");
    expect(invitation.children[0]?.birthday).toBe("05-03");
    expect(invitationError(invitation, now)).toBe("");
    expect(invitationError(invitation, new Date("2026-07-18T10:00:00.000Z"))).toContain("abgelaufen");
    vi.unstubAllGlobals();
  });
});
