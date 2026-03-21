/* =========================================================
   Malik Elzarif — Premium Business Presence
   CODE 3 / js/main.js

   Includes:
   - footer year
   - sticky header state
   - desktop services dropdown behavior
   - mobile menu open / close
   - mobile services accordion
   - ESC key support
   - click outside handling
========================================================= */

(function () {
  const body = document.body;
  const header = document.querySelector(".header");
  const yearEl = document.getElementById("year");

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobilePanel = mobileMenu ? mobileMenu.querySelector(".mobile-menu__panel") : null;
  const mobileClose = mobileMenu ? mobileMenu.querySelector(".mobile-menu__close") : null;

  const mobileAccordionTrigger = document.querySelector(".mobile-accordion__trigger");
  const mobileAccordionContent = document.getElementById("mobile-services-submenu");

  const dropdown = document.querySelector(".dropdown");
  const dropdownTrigger = dropdown ? dropdown.querySelector(".dropdown__trigger") : null;

  /* =========================================================
     FOOTER YEAR
  ========================================================= */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================================
     HEADER SCROLL STATE
  ========================================================= */
  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* =========================================================
     DESKTOP DROPDOWN
  ========================================================= */
  function openDropdown() {
    if (!dropdown || !dropdownTrigger) return;
    dropdown.classList.add("is-open");
    dropdownTrigger.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    if (!dropdown || !dropdownTrigger) return;
    dropdown.classList.remove("is-open");
    dropdownTrigger.setAttribute("aria-expanded", "false");
  }

  if (dropdown && dropdownTrigger) {
    dropdownTrigger.addEventListener("click", function (e) {
      if (window.innerWidth < 980) return;

      e.preventDefault();
      const isOpen = dropdown.classList.contains("is-open");

      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 980) openDropdown();
    });

    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 980) closeDropdown();
    });
  }

  /* =========================================================
     MOBILE MENU
  ========================================================= */
  function openMobileMenu() {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.hidden = false;
    body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.hidden = true;
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";

      if (expanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileMenu);
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function (e) {
      if (!mobilePanel) return;

      if (!mobilePanel.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* =========================================================
     MOBILE ACCORDION
  ========================================================= */
  function toggleMobileAccordion() {
    if (!mobileAccordionTrigger || !mobileAccordionContent) return;

    const expanded = mobileAccordionTrigger.getAttribute("aria-expanded") === "true";

    if (expanded) {
      mobileAccordionTrigger.setAttribute("aria-expanded", "false");
      mobileAccordionContent.hidden = true;
    } else {
      mobileAccordionTrigger.setAttribute("aria-expanded", "true");
      mobileAccordionContent.hidden = false;
    }
  }

  if (mobileAccordionTrigger) {
    mobileAccordionTrigger.addEventListener("click", toggleMobileAccordion);
  }

  /* =========================================================
     GLOBAL CLICK OUTSIDE
  ========================================================= */
  document.addEventListener("click", function (e) {
    if (window.innerWidth >= 980 && dropdown) {
      if (!dropdown.contains(e.target)) {
        closeDropdown();
      }
    }
  });

  /* =========================================================
     ESC KEY SUPPORT
  ========================================================= */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDropdown();
      closeMobileMenu();
    }
  });

  /* =========================================================
     RESET STATES ON RESIZE
  ========================================================= */
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 980) {
      closeMobileMenu();
    } else {
      closeDropdown();
    }
  });
})();