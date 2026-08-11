const trayButton = document.querySelector("[data-open-tray]");
const trayPanel = document.querySelector("[data-tray-panel]");
const trayBackdrop = document.querySelector("[data-tray-backdrop]");
const closeTrayButton = document.querySelector("[data-close-tray]");
const trayCount = document.querySelector("[data-tray-count]");
const trayHeading = document.querySelector("[data-tray-heading]");
const trayList = document.querySelector("[data-tray-list]");
const addButtons = Array.from(document.querySelectorAll("[data-add-service]"));
const revealCards = Array.from(document.querySelectorAll(".reveal-service"));

const selectedServices = [];

function setTrayOpen(isOpen) {
  document.body.classList.toggle("tray-open", isOpen);
  if (trayPanel) trayPanel.setAttribute("aria-hidden", String(!isOpen));
}

function renderTray() {
  if (!trayCount || !trayHeading || !trayList) return;

  trayCount.textContent = String(selectedServices.length);
  trayHeading.textContent = selectedServices.length
    ? `${selectedServices.length} service${selectedServices.length === 1 ? "" : "s"} ready`
    : "No services added";

  trayList.replaceChildren();

  if (!selectedServices.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Pick a template to start building your request.";
    trayList.append(emptyItem);
    return;
  }

  selectedServices.forEach((service, index) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    const order = document.createElement("small");

    name.textContent = service;
    order.textContent = `Request ${index + 1}`;
    item.append(name, order);
    trayList.append(item);
  });
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.addService;
    if (!service) return;
    if (!selectedServices.includes(service)) selectedServices.push(service);
    renderTray();
    setTrayOpen(true);
  });
});

if (trayButton) {
  trayButton.addEventListener("click", () => setTrayOpen(true));
}

if (closeTrayButton) {
  closeTrayButton.addEventListener("click", () => setTrayOpen(false));
}

if (trayBackdrop) {
  trayBackdrop.addEventListener("click", () => setTrayOpen(false));
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setTrayOpen(false);
});

if ("IntersectionObserver" in window && revealCards.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -80px 0px", threshold: 0.16 },
  );

  revealCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.06}s`;
    revealObserver.observe(card);
  });
} else {
  revealCards.forEach((card) => card.classList.add("is-visible"));
}

renderTray();
