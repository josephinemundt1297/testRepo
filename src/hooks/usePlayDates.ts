import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { initialPlayDates, type PlayDate } from "../domain/playdates";

// Die User-ID steckt im Schlüssel, damit zwei Eltern nicht dieselben lokalen Daten sehen.
const storageKey = (userId: string) => `playpal.playdates.${userId}`;

export function readPlayDates(userId: string): PlayDate[] {
  // LocalStorage reicht für den Prototyp. In Produktion gehört das in eine geschützte Datenbank.
  const stored = localStorage.getItem(storageKey(userId));
  return stored ? JSON.parse(stored) : initialPlayDates;
}

export function usePlayDates() {
  const { user } = useUser();
  if (!user)
    throw new Error("PlayDate-Daten dürfen nur angemeldet geladen werden");
  const [dates, setDates] = useState<PlayDate[]>(() => readPlayDates(user.id));
  // State aktualisiert sofort die Ansicht, LocalStorage merkt sich alles nach dem Neuladen.
  const save = (next: PlayDate[]) => {
    setDates(next);
    localStorage.setItem(storageKey(user.id), JSON.stringify(next));
  };
  return { dates, save };
}
