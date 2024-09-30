# Projektbeschreibung: Leichtgewichtige Nutzerregistrierung und -verwaltung

## Überblick
Dieses Projekt zielt darauf ab, eine benutzerfreundliche und sichere Webanwendung für die Nutzerregistrierung und -verwaltung zu entwickeln. Die Anwendung wird mehrere Unterseiten haben und folgende Kernfunktionen bieten:

1. Benutzerregistrierung mit Double Opt-In
2. Sicherer Login-Prozess
3. Passwort-Zurücksetzfunktion
4. Benutzerprofil-Verwaltung

## Hauptfunktionen
1. **Registrierung mit Double Opt-In:**
   - Benutzer geben ihre Daten ein
   - Bestätigungs-E-Mail wird versendet
   - Konto wird nach Bestätigung aktiviert

2. **Login-System:**
   - Sichere Authentifizierung
   - JWT-basierte Sitzungsverwaltung

3. **Passwort-Zurücksetzen:**
   - Benutzer können Passwort-Reset anfordern
   - Sicherer Prozess zur Passwortänderung

4. **Profilseite:**
   - Benutzer können ihre Informationen einsehen und bearbeiten
   - Möglichkeit zur Aktualisierung von Kontaktdaten und Passwort

5. **Gemeinsame Seitenelemente:**
   - Konsistente Navigation und Footer auf allen Seiten

## Technische Anforderungen
- Responsive Design für verschiedene Endgeräte
- Sicherheit: HTTPS, sichere Passwortspeicherung, Schutz vor gängigen Webangriffsvektoren
- Performanceoptimierung für schnelle Ladezeiten
- Einhaltung von Datenschutzrichtlinien (z.B. DSGVO)

## Zukünftige Erweiterungen
- Möglichkeit zur Integration von Drittanbieter-Authentifizierung (z.B. OAuth)
- Erweiterte Profilfunktionen (z.B. Profilbild-Upload)
- Admin-Bereich für Benutzerverwaltung

# Technologie-Stack

Unser Projekt verwendet einen modernen, Node.js-basierten Stack mit Fokus auf Typsicherheit und Effizienz:

1. **Node.js**: JavaScript-Laufzeitumgebung für serverseitige Anwendungen.

2. **Express.js**: Minimalistisches Web-Framework für Node.js, das Routing, Middleware-Support und einfache RESTful API-Erstellung bietet.

3. **TypeScript**: Typisierte Übermenge von JavaScript, die die Codequalität und -wartbarkeit verbessert.

4. **Passport.js**: Authentifizierungs-Middleware für Node.js, die verschiedene Authentifizierungsstrategien unterstützt.

5. **jsonwebtoken**: Implementierung von JSON Web Tokens (JWTs) für sichere Informationsübertragung.

6. **bcryptjs**: Bibliothek zum sicheren Hashen von Passwörtern.

7. **Nodemailer**: Modul zum Versenden von E-Mails aus Node.js-Anwendungen.

8. **SQLite**: Leichtgewichtige, dateibasierte SQL-Datenbank.

9. **EJS (Embedded JavaScript)**: Template Engine für die serverseitige Generierung von HTML.

## Begründung der Technologieauswahl

- **Node.js & Express.js**: Bieten eine schnelle und skalierbare Basis für Webanwendungen.
- **TypeScript**: Verbessert die Codequalität und erleichtert die Wartung.
- **Passport.js**: Flexibel und gut integrierbar für verschiedene Authentifizierungsanforderungen.
- **jsonwebtoken & bcryptjs**: Gewährleisten sichere Authentifizierung und Datenspeicherung.
- **Nodemailer**: Zuverlässige Lösung für E-Mail-Funktionalitäten.
- **SQLite**: Ideal für leichtgewichtige Anwendungen, einfach zu konfigurieren und zu warten.
- **EJS**: Ermöglicht die einfache Erstellung von dynamischen Webseiten mit wiederverwendbaren Komponenten.

Diese Kombination von Technologien ermöglicht eine effiziente Entwicklung, gute Wartbarkeit und hohe Sicherheitsstandards für unser Nutzerregistrierungs- und Verwaltungssystem.

## Installation und Setup

1. Repository klonen:
   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen konfigurieren:
   - Erstellen Sie eine `.env`-Datei im Wurzelverzeichnis
   - Fügen Sie notwendige Umgebungsvariablen hinzu (siehe `.env.example`)

4. Datenbank initialisieren:
   ```bash
   npm run db:init
   ```

5. Anwendung starten:
   ```bash
   npm run dev
   ```

## Projektstruktur

```
src/
├── controllers/    # Request handler
├── middleware/     # Custom middleware
├── models/         # Datenmodelle und Datenbankzugriff
├── routes/         # API-Routen
├── services/       # Geschäftslogik
├── types/          # TypeScript-Typdefinitionen
├
```

## Skripte

- `npm run dev`: Startet den Entwicklungsserver
- `npm run build`: Kompiliert TypeScript zu JavaScript
- `npm start`: Startet die Anwendung in Produktion
- `npm test`: Führt Tests aus

## Beitragen

Wir freuen uns über Beiträge! Bitte lesen Sie unsere Beitragsrichtlinien in [CONTRIBUTING.md](CONTRIBUTING.md).

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.
