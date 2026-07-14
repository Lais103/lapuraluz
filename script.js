document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const header = document.querySelector(".site-header");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 10) {
      header.style.boxShadow = "0 8px 24px rgba(61, 43, 20, 0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  });
});
