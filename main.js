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
    });
    // Auf breiten Bildschirmen ist das Menue immer sichtbar; das hidden-Attribut
    // greift nur, wenn die Kopfzeile in den Burger-Modus faellt.
    var mq = window.matchMedia("(max-width: 860px)");
    function anpassen() {
      nav.hidden = mq.matches;
      burger.setAttribute("aria-expanded", "false");
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
