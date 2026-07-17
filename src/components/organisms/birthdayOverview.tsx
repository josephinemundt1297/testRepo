import { CakeSlice, LockKeyhole } from "lucide-react";
import type { familyProfile, sharedBirthday } from "../../domain/family";
type birthdayEntry = {
  id: string;
  childName: string;
  familyName: string;
  birthday: string;
  own: boolean;
};
// Wir rechnen jeden Geburtstag auf das nächste Vorkommen um. So lässt sich die Liste sauber sortieren.
const nextBirthday = (birthday: string) => {
  const parts = birthday.split("-").map(Number);
  const [month, day] = parts.slice(-2);
  const now = new Date();
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate()))
    next = new Date(now.getFullYear() + 1, month - 1, day);
  return next;
};
// Geteilte Geburtstage enthalten absichtlich kein Geburtsjahr. Für die Anzeige reicht ein neutrales Jahr.
const birthdayDate = (birthday: string) => {
  const parts = birthday.split("-").map(Number);
  const [month, day] = parts.slice(-2);
  return new Date(2000, month - 1, day, 12);
};
export function BirthdayOverview({
  profile,
  shared,
}: {
  profile: familyProfile;
  shared: sharedBirthday[];
}) {
  const own: birthdayEntry[] = profile.children
    .filter((child) => child.birthday)
    .map((child) => ({
      id: child.id,
      childName: child.name,
      familyName: profile.familyName || "Meine Familie",
      birthday: child.birthday,
      own: true,
    }));
  const entries = [
    ...own,
    ...shared.map((item) => ({ ...item, own: false })),
  ].sort(
    (a, b) =>
      nextBirthday(a.birthday).getTime() - nextBirthday(b.birthday).getTime(),
  );
  return (
    <section className="birthday-section" aria-labelledby="birthday-title">
      <div className="birthday-heading">
        <span>
          <CakeSlice />
        </span>
        <div>
          <p className="eyebrow">Nie wieder nachfragen</p>
          <h2 id="birthday-title">Geburtstage im Familienkreis</h2>
        </div>
      </div>
      {entries.length ? (
        <div className="birthday-list">
          {entries.map((entry) => (
            <article key={`${entry.own ? "own" : "shared"}-${entry.id}`}>
              <div className="birthday-date">
                <strong>
                  {new Intl.DateTimeFormat("de-DE", { day: "2-digit" }).format(
                    birthdayDate(entry.birthday),
                  )}
                </strong>
                <span>
                  {new Intl.DateTimeFormat("de-DE", { month: "short" })
                    .format(birthdayDate(entry.birthday))
                    .replace(".", "")}
                </span>
              </div>
              <div>
                <h3>{entry.childName}</h3>
                <p>
                  {entry.familyName}
                  {entry.own ? " · eigenes Profil" : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="birthday-empty">
          <LockKeyhole />
          <div>
            <strong>Noch keine Geburtstage sichtbar</strong>
            <p>
              Trage Geburtstage ein. Nach einer bestätigten Familienverbindung
              erscheinen hier zusätzlich die freigegebenen Geburtstage.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
