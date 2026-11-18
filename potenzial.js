// Potenzialanalyse: schaetzt den Umsatz einer Ferienwohnung aus PLZ, Groesse und Ausstattung.
// Alle Zahlen stehen hier oben und lassen sich ohne Programmierkenntnisse anpassen.

var POTENZIAL = {
  // Brutto-Buchungsumsatz pro Monat (inkl. Reinigungsgebuehr, ohne Ortstaxe) in zentraler Lage.
  // Quelle: eigene Apartments laut Apaleo, Juli bis Oktober 2026.
  // Jede Zeile: [Wohnflaeche in m², Euro pro Monat]. Dazwischen wird gleichmaessig gerechnet.
  // Die m²-Stuetzpunkte sind angenommene typische Groessen (Studio/1 SZ, 2 SZ, 3+ SZ).
  basis: {
    wien:   [[40, 3150], [70, 4080], [100, 5690]],
    berlin: [[45, 4660], [70, 5060], [130, 9680]]
  },
  // Ausserhalb des Zentrums. Wien: aus eigenen Wohnungen im 12., 15. und 18. Bezirk.
  // Berlin: keine eigenen Daten ausserhalb des Zentrums, Wiener Wert uebernommen (Annahme).
  randlage: { wien: 0.85, berlin: 0.85 },
  // Ausstattung: Annahme, dazu gibt es keine Auswertung in Apaleo.
  ausstattung: { einfach: 0.85, mittel: 1, hochwertig: 1.15 },
  // Umrechnung von Juli-Oktober auf das ganze Jahr (Wintermonate sind schwaecher). Annahme.
  jahresfaktor: 0.8,
  // Die Anzeige ist eine Spanne: Schaetzwert minus/plus diesen Anteil.
  spanne: 0.12
};

(function () {
  var form = document.getElementById("rechner");
  if (!form) return;
  var ausgabe = document.getElementById("ergebnis");
  var anfrage = document.getElementById("anfrage");

  function lage(plz) {
    // Wien: 1010 bis 1230. Bezirke 1 bis 9 gelten als zentral.
    var w = /^1(\d\d)0$/.exec(plz);
    if (w && +w[1] >= 1 && +w[1] <= 23) return { stadt: "wien", name: "Wien", zentral: +w[1] <= 9 };
    // Berlin: 10115 bis 14199. Zentral = Mitte, Prenzlauer Berg, Friedrichshain,
    // Kreuzberg, Tiergarten, Charlottenburg, Schoeneberg (PLZ 101xx bis 109xx).
    if (/^\d{5}$/.test(plz) && +plz >= 10115 && +plz <= 14199) {
      return { stadt: "berlin", name: "Berlin", zentral: +plz < 11000 };
    }
    return null;
  }

  function basis(punkte, qm) {
    // Bis zum ersten Stuetzpunkt gilt derselbe Wert: Studios setzen bei uns so viel um wie 1-SZ-Wohnungen.
    if (qm <= punkte[0][0]) return punkte[0][1];
    for (var i = 1; i < punkte.length; i++) {
      if (qm <= punkte[i][0]) {
        var a = punkte[i - 1], b = punkte[i];
        return a[1] + (b[1] - a[1]) * (qm - a[0]) / (b[0] - a[0]);
      }
    }
    // Groesser als der letzte Stuetzpunkt: mit der letzten Steigung weiter, hoechstens 25 % mehr.
    var l = punkte[punkte.length - 1], v = punkte[punkte.length - 2];
    var wert = l[1] + (l[1] - v[1]) / (l[0] - v[0]) * (qm - l[0]);
    return Math.min(wert, l[1] * 1.25);
  }

  function euro(n, schritt) {
    return (Math.round(n / schritt) * schritt).toLocaleString("de-DE") + " €";
  }

  function setze(name, wert) {
    var feld = anfrage.querySelector('[name="' + name + '"]');
    if (feld) feld.value = wert;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var daten = new FormData(form);
    var plz = String(daten.get("plz")).trim();
    var qm = Number(daten.get("qm"));
    var stufe = daten.get("ausstattung");
    var ort = lage(plz);
    var text;

    if (!ort) {
      ausgabe.innerHTML =
        '<h3>Für diese Lage rechnen wir persönlich</h3>' +
        '<p>Unsere Vergleichsdaten stammen aus Wien und Berlin. Für die Postleitzahl ' +
        plz.replace(/[^\dA-Za-z -]/g, "") + ' können wir online keine belastbare Zahl zeigen. ' +
        'Schick uns die Angaben, wir melden uns mit einer Einschätzung.</p>';
      text = "keine Online-Schätzung (PLZ außerhalb Wien/Berlin)";
    } else {
      var monat = basis(POTENZIAL.basis[ort.stadt], qm) *
        (ort.zentral ? 1 : POTENZIAL.randlage[ort.stadt]) *
        POTENZIAL.ausstattung[stufe] * POTENZIAL.jahresfaktor;
      var von = monat * (1 - POTENZIAL.spanne), bis = monat * (1 + POTENZIAL.spanne);
      text = euro(von, 50) + " bis " + euro(bis, 50) + " pro Monat";
      ausgabe.innerHTML =
        '<span class="kicker">Dein Umsatzpotenzial in ' + ort.name + '</span>' +
        '<p class="ergebnis-zahl">' + euro(von, 50) + ' – ' + euro(bis, 50) + '</p>' +
        '<p class="ergebnis-unter">Umsatz pro Monat im Jahresschnitt · rund ' +
        euro(von * 12, 500) + ' – ' + euro(bis * 12, 500) + ' im Jahr</p>' +
        '<p class="klein-hinweis">Unverbindliche Schätzung aus den Buchungsdaten unserer eigenen Apartments ' +
        '(Brutto-Buchungsumsatz inklusive Reinigungsgebühr). Zustand, Grundriss, Stockwerk und Schlafplätze ' +
        'verschieben den Wert. Ob deine Wohnung kurzzeitig vermietet werden darf, hängt von Widmung und ' +
        'Genehmigung ab. Beides prüfen wir für dich.</p>';
    }

    setze("Adresse", daten.get("adresse"));
    setze("PLZ", plz);
    setze("Größe in m²", qm);
    setze("Ausstattung", stufe);
    setze("Online-Schätzung", text);
    ausgabe.hidden = false;
    anfrage.hidden = false;
    document.getElementById("anfrage-hinweis").hidden = true;
    ausgabe.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
