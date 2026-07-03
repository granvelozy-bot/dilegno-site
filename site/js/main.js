// ============================================================
// Config — replace with the real business contact details.
// ============================================================
const CONFIG = {
  whatsappNumber: "526567871400", // MX WhatsApp, digits only, country code first
};

// ============================================================
// Mobile nav
// ============================================================
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
}

// ============================================================
// Scroll reveal (respects prefers-reduced-motion)
// ============================================================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".gallery-item, .events-item, .process-list li, .thesis-quote, .engraving-media, .guarantee-seal"
  );

  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ============================================================
// Contact form -> WhatsApp handoff
// ============================================================
const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const contact = form.contact.value.trim();
    const type = form.type.value;
    const message = form.message.value.trim();

    const text =
      `Hola, soy ${name}.\n` +
      `Contacto: ${contact}\n` +
      `Tipo de pieza: ${type}\n\n` +
      `${message}`;

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");

    formNote.textContent = "Se abrió WhatsApp con tu mensaje listo para enviar.";
  });
}
