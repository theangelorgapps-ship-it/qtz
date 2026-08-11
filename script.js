const accordionSection = document.querySelector(".platform-accordion");
const accordionTabs = Array.from(document.querySelectorAll("[data-accordion-tab]"));
const accordionCards = Array.from(document.querySelectorAll("[data-accordion-card]"));
const pricingSection = document.querySelector(".pricing-section");
const pricingBars = Array.from(document.querySelectorAll(".pricing-bar"));
const operationsCube = document.querySelector(".modal-cube-shell");

function activateAccordionPanel(panelName) {
  accordionTabs.forEach((tab) => {
    const isActive = tab.dataset.accordionTab === panelName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  accordionCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.accordionCard === panelName);
  });
}

function updateScrollAccordion() {
  if (!accordionSection || !accordionCards.length) return;

  const rect = accordionSection.getBoundingClientRect();
  const scrollable = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
  const maxIndex = accordionCards.length - 1;
  const rawIndex = progress * maxIndex;
  const activeIndex = Math.min(maxIndex, Math.max(0, Math.round(rawIndex)));
  const stack = document.querySelector(".accordion-stack");
  const stackHeight = stack ? stack.clientHeight : window.innerHeight * 0.74;
  const collapsedHeight = window.innerWidth <= 820 ? 96 : 84;

  const cardPositions = accordionCards.map((_, index) => {
    if (index === 0) return 0;

    const segmentProgress = Math.min(1, Math.max(0, rawIndex - (index - 1)));
    const startY = stackHeight + collapsedHeight;
    const endY = index * collapsedHeight;
    return Math.round(startY + (endY - startY) * segmentProgress);
  });

  accordionCards.forEach((card, index) => {
    const y = cardPositions[index];
    const nextY = cardPositions[index + 1];
    const visibleHeight = typeof nextY === "number"
      ? Math.max(collapsedHeight, Math.min(stackHeight, nextY + 2))
      : stackHeight;
    const clipBottom = Math.max(0, stackHeight - visibleHeight);

    card.style.setProperty("--card-y", `${Math.round(y)}px`);
    card.style.setProperty("--card-clip-bottom", `${Math.round(clipBottom)}px`);
    card.style.zIndex = String(index + 1);
  });

  const activeCard = accordionCards[activeIndex];
  if (activeCard) activateAccordionPanel(activeCard.dataset.accordionCard);
}

accordionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (!accordionSection || !accordionCards.length) return;

    const index = accordionCards.findIndex((card) => card.dataset.accordionCard === tab.dataset.accordionTab);
    const maxIndex = Math.max(1, accordionCards.length - 1);
    const scrollable = accordionSection.offsetHeight - window.innerHeight;
    const target = accordionSection.offsetTop + (index / maxIndex) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  });
});

window.addEventListener("scroll", updateScrollAccordion, { passive: true });
window.addEventListener("resize", updateScrollAccordion);
updateScrollAccordion();

function updatePricingBars() {
  if (!pricingSection || !pricingBars.length) return;

  const rect = pricingSection.getBoundingClientRect();
  const viewport = window.innerHeight || 1;
  const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));

  pricingBars.forEach((bar, index) => {
    const wave = Math.sin(progress * Math.PI * 2 + index * 0.72);
    const secondaryWave = Math.cos(progress * Math.PI + index * 0.34);
    const morph = Math.round(wave * 26 + secondaryWave * 10);
    bar.style.setProperty("--bar-morph", `${morph}px`);
  });
}

window.addEventListener("scroll", updatePricingBars, { passive: true });
window.addEventListener("resize", updatePricingBars);
updatePricingBars();

if (operationsCube) {
  const toggleCube = () => operationsCube.classList.toggle("is-exploded");

  operationsCube.addEventListener("click", toggleCube);
  operationsCube.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggleCube();
    }
  });
}
