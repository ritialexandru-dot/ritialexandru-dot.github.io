/* Refficks marketing site. No dependencies, no cookies, no tracking. */
(function () {
  "use strict";

  /* ---- Product dropdown ---- */
  var menu = document.querySelector("[data-menu]");
  if (menu) {
    var btn = menu.querySelector("button");
    var close = function () { menu.setAttribute("data-open", "false"); btn.setAttribute("aria-expanded", "false"); };
    var open = function () { menu.setAttribute("data-open", "true"); btn.setAttribute("aria-expanded", "true"); };
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.getAttribute("data-open") === "true" ? close() : open();
    });
    menu.addEventListener("mouseleave", close);
    document.addEventListener("click", function (e) { if (!menu.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
  }

  /* ---- Mobile navigation ---- */
  var burger = document.querySelector("[data-burger]");
  var mnav = document.querySelector("[data-mnav]");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var isOpen = mnav.getAttribute("data-open") === "true";
      mnav.setAttribute("data-open", isOpen ? "false" : "true");
      burger.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  }

  /* ---- Reveal on scroll. Transform + opacity only, so no layout shift. ---- */
  var targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-in");
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  for (var j = 0; j < targets.length; j++) io.observe(targets[j]);
})();
