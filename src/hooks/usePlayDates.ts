import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { initialPlayDates, type playDate } from "../domain/playdates";
import { createLocalRepository } from "../data/localRepository";

// Die User-ID steckt im Schlüssel, damit zwei Eltern nicht dieselben lokalen Daten sehen.
export const playDatesStorageKey = (userId: string) =>
  `playDate.playDates.${userId}`;
const legacyStorageKey = (userId: string) => `playpal.playdates.${userId}`;

export function readPlayDates(userId: string): playDate[] {
  type legacyPlayDate = Omit<playDate, "children" | "friends"> & {
    child?: string;
    friend?: string;
    children?: string[];
  };
  const stored = createLocalRepository<Array<playDate | legacyPlayDate>>({
    key: playDatesStorageKey(userId),
    legacyKeys: [legacyStorageKey(userId)],
    fallback: initialPlayDates,
  }).read();

  // Früher gab es für jede Seite nur einen Namen. Hier packen wir alte Werte in die neuen Listen.
  return stored.map((date) => ({
    ...date,
    children:
      date.children ?? ("child" in date && date.child ? [date.child] : []),
    friends: "friends" in date ? date.friends : date.friend ? [date.friend] : [],
  }));
}

export function usePlayDates() {
  const { user } = useUser();
  if (!user)
    throw new Error("PlayDate-Daten dürfen nur angemeldet geladen werden");
  const [dates, setDates] = useState<playDate[]>(() => readPlayDates(user.id));
  // State aktualisiert sofort die Ansicht, LocalStorage merkt sich alles nach dem Neuladen.
  const save = (next: playDate[]) => {
    setDates(next);
    createLocalRepository({
      key: playDatesStorageKey(user.id),
      legacyKeys: [legacyStorageKey(user.id)],
      fallback: initialPlayDates,
    }).write(next);
  };
  return { dates, save };
}
