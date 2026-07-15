# PlayDate – Phasenplan

## 1. Zweck des Plans

Dieser Phasenplan überführt das Produktkonzept von PlayDate in eine realistische Reihenfolge für die weitere Entwicklung. Ausgangspunkt ist der vorhandene Frontend-Prototyp. Ziel ist ein sicherer, barrierearmer und datenschutzbewusster MVP für einen begrenzten Pilotbetrieb.

Die Zeitangaben sind grobe Richtwerte für ein kleines Team. Sie sind keine festen Veröffentlichungstermine. Datenschutz, externe Anbieter, App-Freigaben und Rückmeldungen aus Nutzertests können den Zeitbedarf verändern.

## 2. Überblick

| Phase | Schwerpunkt | Richtwert | Ergebnis |
| --- | --- | --- | --- |
| 0 | Prototyp stabilisieren | 1–2 Wochen | belastbare technische Ausgangsbasis |
| 1 | Produkt- und Datenschutzgrundlage | 1–2 Wochen | abgestimmter MVP und rechtliche Leitplanken |
| 2 | Backend und Datenmodell | 2–4 Wochen | sichere serverseitige Speicherung |
| 3 | Familien und Verbindungen | 2–3 Wochen | echte private Familienbeziehungen |
| 4 | PlayDates und Einladungen | 2–4 Wochen | vollständiger gemeinsamer Planungsablauf |
| 5 | Kalender und Erinnerungen | 2–3 Wochen | zuverlässige Terminübernahme und Benachrichtigung |
| 6 | Datenschutzfunktionen und Sicherheit | 2–4 Wochen | kontrollierbarer Datenlebenszyklus |
| 7 | A11Y, Qualität und Pilot | 2–3 Wochen | geprüfter MVP für Testfamilien |
| 8 | Produktionsstart | 1–2 Wochen | kontrollierter öffentlicher Betrieb |
| 9 | Ausbau nach dem MVP | fortlaufend | Kommentare, Fotos und weitere Komfortfunktionen |

Mehrere Arbeitspakete können parallel laufen. Eine Phase gilt aber erst als abgeschlossen, wenn ihre Abnahmekriterien erfüllt sind.

## 3. Phase 0 – Prototyp stabilisieren

**Status:** teilweise umgesetzt  
**Richtwert:** 1–2 Wochen

### Ziel

Der vorhandene React-Prototyp wird zu einer verlässlichen Grundlage für die Backend-Integration. Bekannte Übergangslösungen werden dokumentiert, Tests ergänzt und technische Schulden reduziert.

### Bereits vorhanden

- React, TypeScript und Vite
- TanStack Router
- Clerk-Anmeldung und geschützte Oberfläche
- Atomic-Design-Struktur
- Familienprofil mit mehreren Kindern und Geburtstagen
- PlayDates erstellen, bearbeiten und löschen
- `.ics`-Export und Google-Kalender-Link
- Light Mode, Dark Mode und PWA
- erste automatisierte Tests

### Arbeitspakete

- doppelte Kommentare und kleine Inkonsistenzen im Code entfernen
- bestehende Oxlint-Warnungen prüfen und möglichst beheben
- Error Boundary und verständliche Fehlerzustände ergänzen
- Lade-, Leer- und Offline-Zustände vereinheitlichen
- Formularvalidierung für Datum, Uhrzeit und Pflichtfelder erweitern
- Tests für Login-Grenze, Familienformular und PlayDate-Formular ergänzen
- mindestens einen vollständigen End-to-End-Test vorbereiten
- PWA-Aktualisierung und Service-Worker-Verhalten testen
- Demo-Daten klar von echten Nutzerdaten trennen

### Ergebnis

Ein reproduzierbar baubarer Frontend-Stand mit klarer Testbasis und dokumentierten Schnittstellen für das Backend.

### Abnahmekriterien

- `npm run check` läuft ohne Fehler
- kritische Abläufe besitzen automatisierte Tests
- keine privaten Beispieldaten erscheinen versehentlich bei neuen Nutzern
- Fehler- und Leerzustände sind verständlich und per Tastatur erreichbar
- aktuelle Browser auf Smartphone und Desktop wurden geprüft

## 4. Phase 1 – Produkt- und Datenschutzgrundlage

**Richtwert:** 1–2 Wochen  
**Abhängigkeit:** kann parallel zu Phase 0 beginnen

### Ziel

Der MVP-Umfang, die Datenverarbeitung und die Verantwortlichkeiten werden vor der Speicherung echter Kinderdaten verbindlich festgelegt.

### Arbeitspakete

- MVP-Funktionen aus dem Konzept priorisieren und freigeben
- Nutzerrollen und Freigabeabläufe fachlich beschreiben
- Rechtsgrundlagen für Konto-, Familien-, Termin- und Kommunikationsdaten klären
- Einwilligungsablauf für Kindergeburtstage festlegen
- Speicher- und Löschfristen je Datenart bestimmen
- Hosting-Region und eingesetzte Auftragsverarbeiter prüfen
- Drittlandtransfers von Clerk und weiteren Anbietern bewerten
- Datenschutzinformation und Impressum vorbereiten
- Notwendigkeit einer Datenschutz-Folgenabschätzung fachkundig prüfen
- Bedrohungsmodell für Einladungslinks und private Kinderdaten erstellen

### Ergebnis

Ein freigegebener MVP-Scope sowie ein dokumentiertes Datenschutz- und Berechtigungskonzept.

### Abnahmekriterien

- jede erhobene Information besitzt Zweck und Löschfrist
- Rollen und erlaubte Aktionen sind als Berechtigungsmatrix dokumentiert
- Einwilligungen sind getrennt, verständlich und widerrufbar geplant
- Anbieter und Datenflüsse sind vollständig erfasst
- offene rechtliche Risiken haben verantwortliche Personen und nächste Schritte

## 5. Phase 2 – Backend und Datenmodell

**Richtwert:** 2–4 Wochen  
**Abhängigkeit:** Phase 1

### Ziel

Private Daten werden nicht länger als Hauptspeicher im Browser abgelegt, sondern in einem geschützten Backend mit serverseitiger Autorisierung verwaltet.

### Arbeitspakete

- Backend-Technologie und EU-Hosting auswählen
- relationale Datenbank einrichten
- Tabellen für Nutzer, Familien, Kinder, PlayDates und Einwilligungen anlegen
- Clerk-Identität serverseitig prüfen
- API für Familien und PlayDates implementieren
- Berechtigungen bei jeder Lese- und Schreiboperation prüfen
- Schema-Migrationen und Seed-Daten sauber trennen
- Validierung auf Client und Server umsetzen
- verschlüsselte Verbindungen und Secret-Management einrichten
- Backups und Wiederherstellung testen
- lokale Prototyp-Daten optional in das Backend migrieren

### Empfohlenes Kernmodell

- `users`
- `families`
- `familyMembers`
- `children`
- `playDates`
- `playDateParticipants`
- `consents`
- `auditEvents`

Namen dürfen nicht als technische Beziehungsschlüssel verwendet werden. Beziehungen benötigen unveränderliche IDs.

### Ergebnis

Eine versionierte API mit Datenbank, die Familien- und PlayDate-Daten sicher und nutzerbezogen speichert.

### Abnahmekriterien

- ein Nutzer kann niemals Daten einer fremden Familie über die API abrufen
- ungültige oder abgelaufene Clerk-Sitzungen werden abgewiesen
- Eingaben werden serverseitig validiert
- Datenbankmigrationen funktionieren auf einer leeren und einer bestehenden Umgebung
- Backup und Wiederherstellung wurden praktisch getestet
- Secrets befinden sich weder im Frontend-Bundle noch im Repository

## 6. Phase 3 – Familien und private Verbindungen

**Richtwert:** 2–3 Wochen  
**Abhängigkeit:** Phase 2

### Ziel

Familien können sich kontrolliert verbinden. Freigegebene Geburtstage werden nur innerhalb bestätigter Beziehungen sichtbar.

### Arbeitspakete

- Familienprofile über die API verwalten
- mehrere Kinder sicher einer Familie zuordnen
- Einladungsablauf für Familienverbindungen entwickeln
- kurzlebige und nicht erratbare Verbindungstoken verwenden
- Einladungen annehmen, ablehnen und widerrufen
- Berechtigung für Geburtstagsfreigaben serverseitig prüfen
- standardmäßig nur Tag und Monat anzeigen
- Verbindungen blockieren beziehungsweise entfernen können
- verständliche Zustände für offen, bestätigt, abgelehnt und abgelaufen gestalten
- Missbrauchsschutz und Rate Limits für Einladungen ergänzen

### Ergebnis

Zwei bekannte Familien können sich ausdrücklich verbinden und nur freigegebene Informationen sehen.

### Abnahmekriterien

- ohne bestätigte Verbindung sind keine Geburtstage sichtbar
- eine entfernte Verbindung verliert den Zugriff unmittelbar
- das Geburtsjahr bleibt standardmäßig verborgen
- Einladungslinks laufen ab und können widerrufen werden
- alle Verbindungszustände sind per Tastatur und Screenreader verständlich

## 7. Phase 4 – PlayDates und Einladungen

**Richtwert:** 2–4 Wochen  
**Abhängigkeit:** Phasen 2 und 3

### Ziel

Der zentrale Ablauf funktioniert zwischen zwei echten Familien: erstellen, einladen, beantworten, ändern und absagen.

### Arbeitspakete

- PlayDates vollständig über das Backend speichern
- eigenes Kind über eine stabile ID auswählen
- verbundene Familie oder eingeladenes Kind auswählen
- Teilnehmerrollen und Organisator festlegen
- Einladungsstatus offen, angenommen und abgelehnt abbilden
- PlayDate-Änderungen für Beteiligte sichtbar machen
- Absage statt unbemerktem Löschen bei angenommenen Terminen verwenden
- Einladung über Web Share und WhatsApp vorbereiten
- öffentliche Links von privaten Inhalten trennen
- Mitbringsel und Zuständigkeiten strukturiert speichern
- Aktivitätsverlauf für wichtige Terminänderungen ergänzen

### Ergebnis

Ein PlayDate kann zwischen verbundenen Familien vollständig geplant und abgestimmt werden.

### Abnahmekriterien

- nur Organisator und eingeladene Familien sehen den Termin
- eingeladene Personen können zu- oder absagen
- Statusänderungen erscheinen bei allen Beteiligten
- entfernte Teilnehmer verlieren sofort den Zugriff
- ein weitergeleiteter Link allein gewährt keinen Zugriff
- Terminänderungen und Absagen sind eindeutig erkennbar

## 8. Phase 5 – Kalender und Erinnerungen

**Richtwert:** 2–3 Wochen  
**Abhängigkeit:** Phase 4

### Ziel

Termine lassen sich zuverlässig übernehmen. Freiwillige Erinnerungen erreichen Nutzer zur richtigen Zeit.

### Arbeitspakete

- bestehenden `.ics`-Export mit verschiedenen Kalendern testen
- Zeitzonen und Sommerzeit durchgängig berücksichtigen
- Google-Kalender-Link weiter absichern
- Erinnerungsoptionen im Datenmodell speichern
- Queue beziehungsweise Worker für geplante Zustellung einrichten
- zunächst E-Mail oder Web Push als einen Kanal auswählen
- Opt-in, Abbestellung und fehlgeschlagene Zustellung abbilden
- Erinnerungen bei Änderungen neu planen und bei Absage entfernen
- Konzept für spätere Google- und Microsoft-OAuth-Synchronisation vorbereiten

### Ergebnis

Nutzer können Termine übernehmen und auf Wunsch zuverlässig erinnert werden.

### Abnahmekriterien

- exportierte Termine zeigen Datum, Uhrzeit und Zeitzone korrekt
- abgesagte Termine lösen keine Erinnerung aus
- geänderte Termine erzeugen keine doppelten Erinnerungen
- Benachrichtigungen können jederzeit deaktiviert werden
- ohne ausdrückliche Freigabe erfolgt kein Kalenderzugriff

## 9. Phase 6 – Datenschutzfunktionen und Sicherheit

**Richtwert:** 2–4 Wochen  
**Abhängigkeit:** Phasen 2 bis 5

### Ziel

Nutzer können ihre Daten und Freigaben selbst kontrollieren. Technische Schutzmaßnahmen werden vor dem Pilotbetrieb systematisch geprüft.

### Arbeitspakete

- Übersicht der gespeicherten Daten und Einwilligungen erstellen
- Einwilligungen widerrufbar machen
- Datenexport in verständlichem Format anbieten
- Berichtigung und Kontolöschung umsetzen
- Löschfristen automatisieren
- vollständige Löschung in Datenbank, Dateispeicher und Backups planen
- Audit-Protokolle ohne unnötige Inhaltsdaten einführen
- Content Security Policy und sichere HTTP-Header konfigurieren
- Schutz gegen CSRF, XSS, IDOR und Rate-Limit-Umgehung testen
- Abhängigkeiten auf bekannte Schwachstellen prüfen
- Sicherheits- und Datenschutzvorfälle als Prozess beschreiben
- externe Sicherheitsprüfung vor größerem Rollout einplanen

### Ergebnis

Ein datenschutzbewusster MVP mit nachvollziehbaren Freigaben, Export und Löschung.

### Abnahmekriterien

- Nutzer können sehen, welche Daten und Einwilligungen gespeichert sind
- ein Widerruf wirkt auf zukünftige Zugriffe und Verarbeitungen
- Export enthält die eigenen Daten in verständlicher Form
- Kontolöschung entfernt oder anonymisiert Daten nach festgelegten Regeln
- automatisierte Autorisierungstests decken fremde Ressourcen ab
- kritische und hohe Sicherheitsbefunde sind behoben

## 10. Phase 7 – Barrierefreiheit, Qualität und Pilot

**Richtwert:** 2–3 Wochen  
**Abhängigkeit:** Phasen 3 bis 6

### Ziel

Der MVP wird mit realistischen Geräten, Hilfsmitteln und einer kleinen Gruppe freiwilliger Testfamilien geprüft.

### Arbeitspakete

- automatisierte axe-Tests in die Prüfkette aufnehmen
- zentrale Abläufe vollständig per Tastatur testen
- Tests mit VoiceOver und NVDA durchführen
- Kontraste in Light und Dark Mode messen
- mobile Tests mit verschiedenen Displaygrößen durchführen
- End-to-End-Tests für Registrierung, Familie, Einladung und PlayDate ergänzen
- Fehler-, Offline- und langsame Netzwerkzustände testen
- kleine Pilotgruppe mit klarer Einwilligung zusammenstellen
- strukturiertes Feedback zu Verständnis, Vertrauen und Bedienbarkeit sammeln
- Support- und Rückmeldekanal vorbereiten
- gefundene Blocker vor dem Produktionsstart beheben

### Ergebnis

Ein mit echten Nutzungsszenarien geprüfter Release Candidate.

### Abnahmekriterien

- Kernabläufe funktionieren ohne Maus
- keine bekannten kritischen WCAG-2.2-AA-Verstöße
- keine horizontalen Überläufe auf unterstützten Mobilgeräten
- End-to-End-Tests decken die Hauptabläufe ab
- Pilotfamilien verstehen Freigaben und Einladungsstatus ohne Erklärung
- alle kritischen Pilotfehler sind behoben

## 11. Phase 8 – Kontrollierter Produktionsstart

**Richtwert:** 1–2 Wochen  
**Abhängigkeit:** Phase 7 und fachliche Freigaben aus Phase 1

### Ziel

PlayDate geht schrittweise und beobachtbar in den produktiven Betrieb.

### Arbeitspakete

- Produktionsumgebung und eigene Domain konfigurieren
- Monitoring, Alarmierung und Fehlertracking aktivieren
- Backups und Wiederherstellungsplan final prüfen
- Datenschutzinformation und Impressum veröffentlichen
- Betriebs- und Incident-Verantwortung festlegen
- Release-Checkliste und Rollback-Verfahren testen
- zunächst begrenzte Registrierungen oder Einladungsbetrieb verwenden
- Kennzahlen ausschließlich datensparsam erfassen
- Supportanfragen und technische Fehler eng beobachten

### Ergebnis

Ein stabiler MVP im kontrollierten Echtbetrieb.

### Abnahmekriterien

- Monitoring erkennt Ausfälle und ungewöhnliche Fehlerraten
- Rollback und Wiederherstellung sind dokumentiert und getestet
- rechtlich erforderliche Informationen sind erreichbar
- keine kritischen offenen Sicherheits- oder Datenschutzbefunde
- Verantwortlichkeiten für Betrieb und Vorfälle sind eindeutig

## 12. Phase 9 – Ausbau nach dem MVP

**Richtwert:** fortlaufend  
**Abhängigkeit:** stabiler Produktionsbetrieb

Neue Funktionen werden anhand von Pilotfeedback und tatsächlichem Nutzen priorisiert.

### Mögliche Reihenfolge

1. strukturierte Mitbringlisten und Zuständigkeiten
2. Kommentare im geschützten PlayDate-Bereich
3. mehrere Sorgeberechtigte pro Familie
4. private Fotos mit dokumentierter Einwilligung
5. bidirektionale Google- und Microsoft-Kalendersynchronisation
6. feinere Benachrichtigungseinstellungen

### Besondere Freigabe für Fotos

Fotos werden erst umgesetzt, wenn Einwilligung, Widerruf, Berechtigungen, EU-Dateispeicher, Löschfristen und Moderationsprozess vollständig geklärt und technisch testbar sind.

## 13. Phasenübergreifende Qualitätsregeln

Diese Regeln gelten in jeder Phase:

- jede Änderung wird überprüft und durch passende Tests abgesichert
- selbst angelegte Dateien und Ordner verwenden lower camelCase
- Komponenten folgen weiterhin Atomic Design
- private Daten werden serverseitig autorisiert
- neue Datenfelder benötigen Zweck, Sichtbarkeit und Löschfrist
- neue Oberflächen werden in Light und Dark Mode geprüft
- neue Abläufe müssen per Tastatur bedienbar sein
- Geheimnisse gehören weder in den Browser noch in Git
- externe Dienste werden nur mit minimalen Berechtigungen angebunden
- Dokumentation, Konzept und Spezifikation werden bei relevanten Änderungen aktualisiert

## 14. Empfohlene Meilensteine

### Meilenstein A – Technische Basis bereit

Phasen 0 bis 2 abgeschlossen. Der Prototyp verwendet ein sicheres Backend.

### Meilenstein B – Kernablauf vollständig

Phasen 3 und 4 abgeschlossen. Zwei Familien können sich verbinden und ein PlayDate gemeinsam abstimmen.

### Meilenstein C – MVP Release Candidate

Phasen 5 bis 7 abgeschlossen. Kalender, Erinnerungen, Datenschutzfunktionen und Qualitätsprüfungen sind vorhanden.

### Meilenstein D – Produktiver MVP

Phase 8 abgeschlossen. PlayDate läuft kontrolliert mit echten Nutzern.

## 15. Unmittelbar nächste Schritte

1. Phase 0 als GitHub-Meilenstein anlegen.
2. vorhandene Warnungen, Testlücken und technische Übergangslösungen als Issues erfassen.
3. MVP-Scope und Rollenmodell aus Phase 1 fachlich bestätigen.
4. Datenschutzberatung für Kinderdaten und Einladungsabläufe einplanen.
5. Backend, Datenbank und EU-Hosting anhand einer kurzen Entscheidungsmatrix auswählen.
6. erst danach mit der Speicherung echter Familien- und Kinderdaten beginnen.
