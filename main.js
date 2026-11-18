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

// Preserve all fields when preparing an email; sending remains in the user's mail app.
document.querySelectorAll('form[action^="mailto:"]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var target = new URL(form.action);
    var lines = [];
    new FormData(form).forEach(function (value, key) {
      if (String(value).trim()) lines.push(key + ': ' + value);
    });
    var subject = target.searchParams.get('subject') || 'Anfrage über Hostbuddies';
    window.location.href = target.protocol + target.pathname + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n\n'));
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
