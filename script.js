const navbar = document.querySelector("[data-navbar]");
const scrollSentinel = document.querySelector("[data-scroll-sentinel]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const menuBackdrop = document.querySelector("[data-menu-backdrop]");
const videoOverlay = document.querySelector("[data-video-overlay]");
const openVideoButton = document.querySelector("[data-open-video]");
const closeVideoButton = document.querySelector("[data-close-video]");
const marqueeTrack = document.querySelector("[data-marquee-track]");
const countChip = document.querySelector("[data-count-chip]");
const revealTargets = Array.from(document.querySelectorAll(".reveal-on-scroll"));

let isMenuOpen = false;
let isVideoOpen = false;

document.documentElement.classList.add("has-motion-js");

function updateBodyLock() {
  document.body.classList.toggle("is-locked", isMenuOpen || isVideoOpen);
}

function isTargetInView(target) {
  const rect = target.getBoundingClientRect();
  return rect.top < window.innerHeight - 80 && rect.bottom > 80;
}

function setMenuOpen(nextState) {
  if (!menuToggle || !mobilePanel) return;

  isMenuOpen = nextState;
  document.body.classList.toggle("menu-open", isMenuOpen);
  menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
  menuToggle.setAttribute("aria-label", isMenuOpen ? "Close navigation menu" : "Open navigation menu");
  updateBodyLock();
}

function setVideoOpen(nextState) {
  if (!videoOverlay) return;

  isVideoOpen = nextState;
  videoOverlay.classList.toggle("is-open", isVideoOpen);
  videoOverlay.setAttribute("aria-hidden", String(!isVideoOpen));
  updateBodyLock();
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => setMenuOpen(!isMenuOpen));
}

if (menuBackdrop) {
  menuBackdrop.addEventListener("click", () => setMenuOpen(false));
}

if (mobilePanel) {
  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

if (openVideoButton) {
  openVideoButton.addEventListener("click", () => setVideoOpen(true));
}

if (closeVideoButton) {
  closeVideoButton.addEventListener("click", () => setVideoOpen(false));
}

if (videoOverlay) {
  videoOverlay.addEventListener("click", (event) => {
    if (event.target === videoOverlay) setVideoOpen(false);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setMenuOpen(false);
  setVideoOpen(false);
});

if (navbar && scrollSentinel && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { threshold: 0 },
  );

  navObserver.observe(scrollSentinel);
}

if (marqueeTrack) {
  const originalCards = Array.from(marqueeTrack.children);

  for (let repeat = 0; repeat < 2; repeat += 1) {
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      marqueeTrack.appendChild(clone);
    });
  }
}

if (countChip) {
  const counts = ["QTZ", "BID", "PAY", "ID"];
  let countIndex = 0;

  window.setInterval(() => {
    countIndex = (countIndex + 1) % counts.length;
    countChip.textContent = counts[countIndex];
    countChip.classList.add("is-popping");
    window.setTimeout(() => countChip.classList.remove("is-popping"), 700);
  }, 2000);
}

if ("IntersectionObserver" in window && revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -100px 0px", threshold: 0.1 },
  );

  revealTargets.forEach((target, index) => {
    target.style.animationDelay = `${index * 0.08}s`;
    if (isTargetInView(target)) {
      target.classList.add("is-visible");
    } else {
      observer.observe(target);
    }
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
