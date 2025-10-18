feather.replace();

const modal = document.getElementById("ticket-modal");
const buyTicketBtn = document.getElementById("buy-ticket-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

if (buyTicketBtn && modal && closeModalBtn) {
  buyTicketBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

const accordionButtons = document.querySelectorAll('[data-toggle="accordion"]');

if (accordionButtons.length > 0) {
  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetPanel = document.getElementById(targetId);
      const icon = button.querySelector("svg");

      if (targetPanel.style.display === "block") {
        targetPanel.style.display = "none";
        icon.classList.add("rotate-180");
      } else {
        targetPanel.style.display = "block";
        icon.classList.remove("rotate-180");
      }
    });
  });
}
