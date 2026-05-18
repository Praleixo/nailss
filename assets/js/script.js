const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".main-nav a");
const revealItems = document.querySelectorAll(".reveal");
const bookingForm = document.querySelector("[data-booking-form]");
const feedback = document.querySelector("[data-form-feedback]");
const WHATSAPP_URL = "https://contate.me/ios/stenailsagendamento";

if (window.lucide) {
  window.lucide.createIcons();
}

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const instagramGallery = document.querySelector(".instagram-gallery");
const instagramPrev = document.querySelector(".instagram-gallery-prev");
const instagramNext = document.querySelector(".instagram-gallery-next");

const scrollGallery = (distance) => {
  if (!instagramGallery) return;
  instagramGallery.scrollBy({ left: distance, behavior: "smooth" });
};

const updateGalleryButtons = () => {
  if (!instagramGallery || !instagramPrev || !instagramNext) return;
  const maxScroll = instagramGallery.scrollWidth - instagramGallery.clientWidth;
  instagramPrev.disabled = instagramGallery.scrollLeft <= 10;
  instagramNext.disabled = instagramGallery.scrollLeft >= maxScroll - 10;
};

if (instagramGallery && instagramPrev && instagramNext) {
  instagramPrev.addEventListener("click", () => scrollGallery(-instagramGallery.clientWidth * 0.9));
  instagramNext.addEventListener("click", () => scrollGallery(instagramGallery.clientWidth * 0.9));
  instagramGallery.addEventListener("scroll", updateGalleryButtons, { passive: true });
  updateGalleryButtons();
}

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-42% 0px -52% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => activeObserver.observe(section));

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const nome = formData.get("nome").trim();
  const servico = formData.get("servico");
  const dia = formData.get("dia").trim();
  const telefone = formData.get("telefone").trim();

  const message = `Olá! Meu nome é ${nome}. Quero agendar ${servico}. Melhor dia/horário: ${dia}. Meu WhatsApp é ${telefone}.`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(message).catch(() => {});
  }

  feedback.textContent = "Mensagem pronta. Abrindo o WhatsApp de agendamento.";
  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
});
