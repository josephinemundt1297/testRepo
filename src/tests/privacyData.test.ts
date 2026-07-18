import { describe, expect, it } from "vitest";
import { collectLocalData, removeLocalData } from "../utils/privacyData";

describe("lokale Datenschutzfunktionen", () => {
  it("exportiert nur die PlayDate-Daten des gewählten Trainingskontos", () => {
    localStorage.setItem("playDate.family.user-1", JSON.stringify({ familyName: "Demo" }));
    localStorage.setItem("playDate.family.user-2", JSON.stringify({ familyName: "Fremd" }));
    localStorage.setItem("playDate.trainingInvitations", JSON.stringify([
      { token: "PD-USER-0001", createdBy: "user-1" },
      { token: "PD-USER-0002", createdBy: "user-2" },
    ]));

    const exported = collectLocalData("user-1");

    expect(exported.family).toEqual({ familyName: "Demo" });
    expect(exported.trainingInvitations).toHaveLength(1);
    expect(JSON.stringify(exported)).not.toContain("Fremd");
  });

  it("löscht lokale Familiendaten, Geburtstage und PlayDates gemeinsam", () => {
    ["family", "sharedBirthdays", "connections", "playDates"].forEach((area) =>
      localStorage.setItem(`playDate.${area}.user-1`, "[]"),
    );
    localStorage.setItem("playDate.trainingInvitations", JSON.stringify([
      { token: "PD-USER-0001", createdBy: "user-1" },
    ]));

    removeLocalData("user-1");

    expect(Object.keys(localStorage)).toEqual([]);
  });
});
