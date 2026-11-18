// Einziges Skript der Seite: klappt das Menue auf schmalen Bildschirmen auf
// und markiert den aktuellen Menuepunkt. Kein Framework, keine Abhaengigkeiten.

(function () {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var offen = !nav.hidden;
      nav.hidden = offen;
      burger.setAttribute("aria-expanded", String(!offen));
      burger.setAttribute("aria-label", offen ? "Menü öffnen" : "Menü schließen");
    });
    // Auf breiten Bildschirmen ist das Menue immer sichtbar; das hidden-Attribut
    // greift nur, wenn die Kopfzeile in den Burger-Modus faellt.
    var mq = window.matchMedia("(max-width: 860px)");
    function anpassen() {
      nav.hidden = mq.matches;
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Menü öffnen");
    }
    mq.addEventListener("change", anpassen);
    anpassen();
  }

  var hier = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var ziel = a.getAttribute("href").split("#")[0];
    if (ziel === hier) a.setAttribute("aria-current", "page");
  });
})();

// Formulare: Mit einem Web3Forms-Schluessel gehen Anfragen direkt als E-Mail an uns.
// Ohne Schluessel (leer) oeffnet das Formular wie bisher das Mailprogramm des Besuchers.
var WEB3FORMS_KEY = "";

document.querySelectorAll('form[action^="mailto:"]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var target = new URL(form.action);
    var subject = target.searchParams.get('subject') || 'Anfrage über Hostbuddies';
    var felder = {};
    var lines = [];
    new FormData(form).forEach(function (value, key) {
      if (key === 'botcheck' || !String(value).trim()) return;
      felder[key] = value;
      lines.push(key + ': ' + value);
    });
    function mailprogramm() {
      window.location.href = target.protocol + target.pathname + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n\n'));
    }
    if (!WEB3FORMS_KEY) { mailprogramm(); return; }
    var honig = form.querySelector('[name="botcheck"]');
    if (honig && honig.checked) return;
    var knopf = form.querySelector('button[type="submit"]');
    if (knopf) { knopf.disabled = true; knopf.textContent = 'Wird gesendet …'; }
    felder.access_key = WEB3FORMS_KEY;
    felder.subject = subject;
    felder.from_name = 'hostbuddies.eu';
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(felder)
    }).then(function (antwort) { return antwort.json(); }).then(function (ergebnis) {
      if (!ergebnis.success) throw new Error('nicht gesendet');
      var danke = document.createElement('p');
      danke.className = 'gesendet';
      danke.setAttribute('role', 'status');
      danke.textContent = 'Danke, deine Anfrage ist bei uns angekommen. Wir melden uns innerhalb von 48 Stunden.';
      form.replaceWith(danke);
    }).catch(function () {
      // Versand gescheitert: Anfrage geht nicht verloren, sondern ins Mailprogramm.
      if (knopf) { knopf.disabled = false; knopf.textContent = 'Noch einmal senden'; }
      mailprogramm();
    });
  });
});
document.addEventListener('keydown', function (event) {
  var button = document.querySelector('.burger');
  var menu = document.querySelector('.nav');
  if (event.key === 'Escape' && button && menu && window.matchMedia('(max-width: 860px)').matches && !menu.hidden) {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Menü öffnen');
    button.focus();
  }
});
