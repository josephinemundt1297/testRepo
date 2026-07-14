# PlayPal – PlayDates einfach planen

PlayPal ist ein mobile-first React-Prototyp, mit dem Eltern sichere und übersichtliche Spieletreffen für ihre Kinder planen können. Die Oberfläche ist deutschsprachig, tastaturbedienbar und für kleine Displays optimiert.

## Funktionen

- PlayDates erstellen, bearbeiten und löschen
- Treffpunkt, Teilnehmende und Mitbringsel festhalten
- Einladungen über die Web Share-/WhatsApp-Schnittstelle vorbereiten
- Kalender- und Erinnerungsaktionen als klar markierte Integrationspunkte
- Status für bestätigte und ausstehende Treffen
- Datenschutz-Hinweise für Fotos, Kommentare und eingeladene Familien
- Clerk-Provider für Login vorbereitet
- Routing mit TanStack Router
- Persistenz des Prototyps über `localStorage`

## Lokale Entwicklung

Voraussetzungen: Node.js 20 oder neuer und npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Die App läuft anschließend normalerweise unter `http://localhost:5173`.

## Clerk einrichten

1. In Clerk eine neue Anwendung anlegen.
2. Den Publishable Key kopieren.
3. In `.env.local` eintragen:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Ohne Key startet die App im lokalen Vorschau-Modus. Geheimnisse wie der Clerk Secret Key gehören nie in eine `VITE_`-Variable oder ins Repository.

## Skripte

```bash
npm run dev      # Entwicklungsserver
npm run build    # TypeScript-Prüfung und Produktions-Build
npm run lint     # Statische Codeprüfung
npm run preview  # Produktions-Build lokal ansehen
```

## Integrationen: nächste Produktionsschritte

Der aktuelle Stand ist ein funktionsfähiger Frontend-Prototyp. Für den Produktivbetrieb werden serverseitige Dienste benötigt:

- **Authentifizierung:** Clerk-Komponenten für Sign-in/Sign-up und geschützte Routen ergänzen.
- **Datenbank:** PlayDates, Einladungen, Kommentare und Einwilligungen mandantenfähig speichern (z. B. PostgreSQL).
- **WhatsApp:** Einladungslinks über WhatsApp teilen; für automatisierte Nachrichten ausschließlich die offizielle WhatsApp Business Platform und ausdrückliches Opt-in verwenden.
- **Kalender:** OAuth-Integration für Google/Microsoft sowie `.ics`-Export; nur die minimal notwendigen Kalenderrechte anfordern.
- **Fotos:** EU-Hosting, kurzlebige Upload-URLs, rollenbasierter Zugriff, Löschfristen und dokumentierte Einwilligung der Sorgeberechtigten.
- **Erinnerungen:** Queue/Worker mit E-Mail oder Push; Opt-in, Abbestellung und Zeitzonen beachten.

## A11Y

Die Oberfläche nutzt semantische Überschriften, Navigationen, sichtbare Fokusmarkierungen, einen Skip-Link, ausreichend große Touch-Ziele, verständliche Labels und `aria-live`-Statusmeldungen. Animationen werden bei `prefers-reduced-motion` deaktiviert. Vor einem Release sollten zusätzlich automatisierte axe-Tests und manuelle Tests mit Tastatur, VoiceOver und NVDA erfolgen.

## DSGVO-Checkliste

Technische Gestaltung allein macht eine App nicht automatisch DSGVO-konform. Vor einem Produktivstart sind mindestens erforderlich:

- Rechtsgrundlage und Einwilligung für Kinderfotos und Kommunikationskanäle dokumentieren
- Datensparsamkeit, Zweckbindung und getrennte Einwilligungen umsetzen
- EU/EWR-Auftragsverarbeitung und Drittlandtransfers der Anbieter prüfen
- Auskunft, Export, Berichtigung und vollständige Löschung ermöglichen
- Lösch- und Aufbewahrungsfristen technisch erzwingen
- Rollen- und Berechtigungskonzept für eingeladene Familien einführen
- Datenschutzinformation, Impressum und Verzeichnis von Verarbeitungstätigkeiten erstellen
- Datenschutz-Folgenabschätzung mit fachkundiger Beratung prüfen

## Architektur

```text
src/
├── App.tsx      # Routen, Seiten, Formulare und Prototyp-Daten
├── App.css      # Mobile-first Designsystem und Komponenten
├── index.css    # globale Tokens und A11Y-Grundlagen
└── main.tsx     # React, ClerkProvider und RouterProvider
```

## Lizenz

Privates Projekt – alle Rechte vorbehalten.
