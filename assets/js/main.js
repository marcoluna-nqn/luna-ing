const CONTACT = {
  whatsappDisplay: "+54 299 620 9136",
  whatsappRaw: "+54 299 620 9136",
  email: "marcoantoniolunavillegas@gmail.com",
  location: "Neuquén, Argentina"
};

const THEME_KEY = "luna-ing-theme";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const html = document.documentElement;

const normalizePhone = (value) => value.replace(/\D/g, "");
const whatsappNumber = normalizePhone(CONTACT.whatsappRaw);
const whatsappMessage = encodeURIComponent("Hola Luna Ing, quiero pedir un presupuesto.");
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
const emailHref = `mailto:${CONTACT.email}`;

const applyTheme = (theme) => {
  html.dataset.theme = theme;
  const toggle = document.querySelector("#theme-toggle");
  if (!toggle) return;
  const isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.textContent = isDark ? "Tema oscuro" : "Tema claro";
};

const getSystemTheme = () => (prefersDark.matches ? "dark" : "light");

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme || getSystemTheme());
};

const wireThemeToggle = () => {
  const toggle = document.querySelector("#theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const currentTheme = html.dataset.theme || getSystemTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
  prefersDark.addEventListener("change", () => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(getSystemTheme());
    }
  });
};

const wireContact = () => {
  const anchors = [
    ["#cta-whatsapp", whatsappHref],
    ["#cta-email", emailHref],
    ["#contact-whatsapp-btn", whatsappHref],
    ["#contact-email-btn", emailHref],
    ["#contact-whatsapp-text", whatsappHref],
    ["#contact-email-text", emailHref]
  ];
  anchors.forEach(([selector, href]) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute("href", href);
  });
  const whatsappText = document.querySelector("#contact-whatsapp-text");
  if (whatsappText) whatsappText.textContent = CONTACT.whatsappDisplay;
  const emailText = document.querySelector("#contact-email-text");
  if (emailText) emailText.textContent = CONTACT.email;
  const location = document.querySelector("#contact-location");
  if (location) location.textContent = CONTACT.location;
};

const wireActiveSection = () => {
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const linksById = new Map(
    navLinks.map((link) => [link.getAttribute("href")?.replace("#", ""), link])
  );
  const sections = Array.from(linksById.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        .slice(0, 1)
        .forEach((entry) => {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = linksById.get(entry.target.id);
          if (active) active.classList.add("active");
        });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0.15, 0.35, 0.7] }
  );

  sections.forEach((section) => observer.observe(section));
};

const wireForm = () => {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Consulta web - ${name || "Sin nombre"}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmpresa: ${company || "No especificada"}\nUbicación: ${CONTACT.location}\n\nDetalle:\n${message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  });
};

const wireYear = () => {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  wireThemeToggle();
  wireContact();
  wireActiveSection();
  wireForm();
  wireYear();
});
