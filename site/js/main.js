// ============================================================
// Config — replace with the real business contact details.
// ============================================================
const CONFIG = {
  whatsappNumber: "526567871400", // MX WhatsApp, digits only, country code first
  contactEmail: "granvelozy@gmail.com",
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
    ".gallery-item, .events-item, .process-list li, .engraving-media, .guarantee-seal, .section-head, .testimonial-card, .faq-item, .contact-copy, .contact-form"
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
// Floating WhatsApp button (hidden while the hero is in view)
// ============================================================
const whatsappFloat = document.getElementById("whatsapp-float");
const heroSection = document.getElementById("inicio");

if (whatsappFloat && heroSection && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        whatsappFloat.classList.toggle("is-visible", !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  heroObserver.observe(heroSection);
} else if (whatsappFloat) {
  whatsappFloat.classList.add("is-visible");
}

// ============================================================
// FAQ accordion
// ============================================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const trigger = item.querySelector(".faq-item__trigger");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const wasOpen = item.classList.contains("is-open");

    faqItems.forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".faq-item__trigger").setAttribute("aria-expanded", "false");
    });

    if (!wasOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

// ============================================================
// Contact form -> Email handoff
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

    const subject = `Nueva solicitud de pieza — ${type}`;
    const body =
      `Nombre: ${name}\n` +
      `Contacto: ${contact}\n` +
      `Tipo de pieza: ${type}\n\n` +
      `${message}`;

    const url = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;

    formNote.textContent = "Se abrió tu programa de correo con el mensaje listo para enviar.";
  });
}
