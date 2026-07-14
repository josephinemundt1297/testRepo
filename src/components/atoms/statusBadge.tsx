import type { PlayDate } from "../../domain/playdates";
// Kleiner Status-Baustein, damit „Bestätigt“ überall gleich aussieht.
export function StatusBadge({ status }: Pick<PlayDate, "status">) {
  return (
    <span className={`status ${status === "Bestätigt" ? "confirmed" : ""}`}>
      {status}
    </span>
  );
}
