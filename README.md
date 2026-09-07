# Hostbuddies – Website

Neue Website für hostbuddies.eu als reine HTML-Seite, gestaltet nach dem
Vorbild einer klassischen Agenturseite (feste weiße Kopfzeile, großer Hero mit
Illustration, Kacheln, Petrolblau als Akzent). Ersetzt die bisherige Jimdo-Seite.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `service.html` | Leistungen im Detail |
| `features.html` | Technik und Arbeitsweise: KI-Inserate, Dynamic Pricing, Ablauf, FAQ |
| `pricing.html` | Provision, Buchungsbeispiel, was inklusive ist |
| `ueber-uns.html` | Wer hinter Hostbuddies steht |
| `galerie.html` | Bildergalerie (derzeit Platzhalter) |
| `kontakt.html` | E-Mail, WhatsApp, Kontaktformular |
| `impressum.html`, `datenschutz.html`, `widerruf.html` | Rechtliches |
| `style.css` | Gesamte Gestaltung, Farben oben unter `:root` |
| `main.js` | Menü auf dem Handy, Markierung der aktuellen Seite |
| `img/` | Eigene Bilder hier ablegen |

Kein Framework, kein Baukasten, keine Abhängigkeiten. Jede Datei lässt sich
mit einem Texteditor ändern.

## Ansehen

Doppelklick auf `index.html` öffnet die Seite im Browser. Alle Links
funktionieren auch ohne Server.

## Noch offen


- **Bilder:** 18 Fotos von cityswap.eu (Wien und Berlin) liegen in `img/` (Wiener Apartments
  und Stadtmotive). Hero, Galerie, Leistungen und die blauen Bänder nutzen sie.
  Weitere Fotos einfach dazulegen und in `galerie.html` als `<img>` ergänzen.
- **Foto Über uns:** `img/team.jpg` ist das Portrait aus IMG_8071.HEIC,
  fest ins Hochformat gedreht. Zum Austauschen einfach die Datei ersetzen.
- **Logo:** Avatar von der alten Jimdo-Seite (`img/logo.jpg`, 1024 px, und
  `img/logo-512.jpg`), rund beschnitten in Kopf- und Fußzeile, auch Favicon.
- **Telefon/WhatsApp:** Auf der Kontaktseite steht +43 676 386 51 49 von
  cityswap.eu. Falls Hostbuddies eine eigene Nummer bekommt, in `kontakt.html`
  beide Links (`tel:` und `wa.me`) anpassen.
- **Formulare:** Kontakt und Widerruf öffnen das Mailprogramm des Besuchers.
  Wer echten Versand ohne Mailprogramm will, braucht einen Formulardienst.
- **Datenschutz:** Text von der alten Seite übernommen und an die neue
  Technik angepasst (keine Cookies, keine Analyse, keine Google-Schriften).
  Vor Veröffentlichung juristisch gegenlesen lassen.

## Vertrauen

- Startseite und Über uns zeigen zwei eigene Airbnb-Inserate mit Sternewert
  und Bewertungszahl (Stand 07.09.2026: Wien 4,91 bei 23 Bewertungen, Berlin
  5,0 mit Superhost). Die Werte sind fest eingetragen und müssen von Hand
  nachgezogen werden. Ein drittes Inserat (973140728211803449) war nicht
  erreichbar und ist deshalb nicht verlinkt.
- Die vier Gästezitate sind gekürzte Airbnb-Rezensionen der beiden Inserate
  (Roberta, Henri, Keith aus Wien; Natalia aus Berlin), Auslassungen mit „…“
  markiert. Alle 25 Rezensionen liegen zum Nachschlagen nicht im Ordner,
  sondern sind auf Airbnb einsehbar.
- Zusagen (Antwort unter einer Stunde, Schätzung in 48 Stunden, monatlich
  kündbar) stehen auf Startseite und Pricing. Nur behalten, was gehalten wird.

## Kennzahlen

Die Zahlen auf Startseite und Über uns sind Schätzungen aus 55 Apartments,
3,5 Betten im Schnitt, 75 % Auslastung, 2,5 Gästen pro belegter Nacht und
3 Nächten Aufenthalt: rund 15.000 Apartment-Nächte, 37.500 Übernachtungen,
12.500 Gäste pro Jahr. Auf der Seite stehen 12.000+ Gäste und 30.000+ Übernachtungen, dazu 24/7.
Bei anderen Ist-Werten in `index.html` und `ueber-uns.html` anpassen.

## Veröffentlichen

Der Ordner ist ein Git-Repository und liegt auf GitHub unter
<https://github.com/ckegel87-glitch/hostbuddies> (öffentlich, weil GitHub
Pages im Gratis-Tarif das verlangt). GitHub Pages liefert den Stand von
`main` unter <https://ckegel87-glitch.github.io/hostbuddies/> aus.

Jede Änderung geht so live:

```bash
git add -A && git commit -m "..." && git push
```

Nach dem Push dauert es etwa eine Minute.

Domain hostbuddies.eu zeigt noch auf Jimdo. Umstellung: Datei `CNAME` mit
Inhalt `hostbuddies.eu` ins Repo, beim Domain-Anbieter einen A-Record auf
die GitHub-Pages-Adressen (185.199.108.153 bis .111.153) und `www` als
CNAME auf `ckegel87-glitch.github.io`, dann in den Repo-Einstellungen unter
Pages die Domain eintragen und HTTPS erzwingen.
