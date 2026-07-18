import { Download, Plus } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { usePlayDates } from "../../hooks/usePlayDates";
import { downloadCalendar } from "../../utils/calendar";
import { PlayDateCalendar } from "../organisms/playDateCalendar";
import { useFamilyProfile } from "../../hooks/useFamilyProfile";
import type { calendarBirthday } from "../../utils/calendarGrid";

// Die Page holt die privaten Termine. Die eigentliche Kalenderdarstellung bleibt im Organism.
export function CalendarPage() {
  const { dates } = usePlayDates();
  const { profile, sharedBirthdays } = useFamilyProfile();
  const navigate = useNavigate();
  const sortedDates = useMemo(
    () => [...dates].sort((a, b) => a.date.localeCompare(b.date)),
    [dates],
  );
  // Eigene und freigegebene Geburtstage bekommen dieselbe kleine Kalenderform.
  // `own` hilft der Ansicht später beim verständlichen Beschriften.
  const birthdays: calendarBirthday[] = [
    ...profile.children
      .filter((child) => child.birthday)
      .map((child) => ({
        id: child.id,
        childName: child.name,
        familyName: profile.familyName || "Meine Familie",
        birthday: child.birthday,
        own: true,
      })),
    ...sharedBirthdays.map((birthday) => ({ ...birthday, own: false })),
  ];

  return (
    <div className="page-wrap calendar-page">
      <div className="section-heading calendar-page-heading">
        <div>
          <p className="eyebrow">Alles auf einen Blick</p>
          <h2>Dein PlayDate-Kalender</h2>
        </div>
        <div className="calendar-page-actions">
          <button className="btn btn-outline" onClick={() => downloadCalendar(sortedDates)}>
            <Download /> Kalenderdatei
          </button>
          <Link to="/new" className="btn btn-primary">
            <Plus /> PlayDate planen
          </Link>
        </div>
      </div>
      <PlayDateCalendar
        dates={sortedDates}
        birthdays={birthdays}
        onEdit={(id) => navigate({ to: "/edit/$playDateId", params: { playDateId: String(id) } })}
      />
    </div>
  );
}
