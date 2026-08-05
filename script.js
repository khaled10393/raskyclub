/* =========================================================
   RASKY CLUB — script.js
   ========================================================= */

/* -----------------------------------------------------------
   1) ENLACE DE PAGO DE HOTMART
   Reemplaza la siguiente línea por tu enlace real de Hotmart.
   Todos los botones "ÚNETE AHORA" apuntarán automáticamente
   a esta URL.
----------------------------------------------------------- */
const HOTMART_LINK = "https://pay.hotmart.com/H106985359R";

document.querySelectorAll(".js-hotmart-link").forEach((link) => {
  link.setAttribute("href", HOTMART_LINK);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

/* -----------------------------------------------------------
   2) Año dinámico en el footer
----------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -----------------------------------------------------------
   3) Animaciones al hacer scroll (reveal)
----------------------------------------------------------- */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* -----------------------------------------------------------
   4) Acordeón de preguntas frecuentes
----------------------------------------------------------- */
document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion__item");
    const panel = item.querySelector(".accordion__panel");
    const isOpen = item.classList.contains("is-open");

    // Cierra los demás paneles abiertos
    document.querySelectorAll(".accordion__item.is-open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("is-open");
        openItem.querySelector(".accordion__trigger").setAttribute("aria-expanded", "false");
        openItem.querySelector(".accordion__panel").style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = null;
    } else {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

/* -----------------------------------------------------------
   5) CTA flotante en móvil (aparece al salir del hero)
----------------------------------------------------------- */
const stickyCta = document.getElementById("stickyCta");
const heroEl = document.querySelector(".hero");

if (stickyCta && heroEl && "IntersectionObserver" in window) {
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  ctaObserver.observe(heroEl);
}
