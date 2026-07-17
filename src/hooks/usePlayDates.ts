import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { initialPlayDates, type playDate } from "../domain/playdates";
import { createLocalRepository } from "../data/localRepository";

// Die User-ID steckt im Schlüssel, damit zwei Eltern nicht dieselben lokalen Daten sehen.
export const playDatesStorageKey = (userId: string) =>
  `playDate.playDates.${userId}`;
const legacyStorageKey = (userId: string) => `playpal.playdates.${userId}`;

export function readPlayDates(userId: string): playDate[] {
  const stored = createLocalRepository<Array<playDate | (Omit<playDate, "children"> & { child: string })>>({
    key: playDatesStorageKey(userId),
    legacyKeys: [legacyStorageKey(userId)],
    fallback: initialPlayDates,
  }).read();

  // Alte Termine hatten genau ein `child`. Hier wandert es ohne Datenverlust in die neue Liste.
  return stored.map((date) =>
    "children" in date ? date : { ...date, children: [date.child] },
  );
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
