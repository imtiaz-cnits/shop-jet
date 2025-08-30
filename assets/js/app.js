//...........................................................................
//..............................Preloader Start................................
//...........................................................................
(function () {
  window.addEventListener("load", function () {
    const preloader = document.getElementById("pagePreloader");

    setTimeout(function () {
      preloader.classList.add("opacity-0", "pointer-events-none");

      setTimeout(function () {
        preloader.classList.add("hidden");
        document.dispatchEvent(new Event("preloaderComplete"));
      }, 500);
    }, 1000);
  });

  setTimeout(function () {
    const preloader = document.getElementById("pagePreloader");
    if (preloader && !preloader.classList.contains("hidden")) {
      preloader.classList.add("opacity-0", "pointer-events-none");
      setTimeout(function () {
        preloader.classList.add("hidden");
      }, 500);
    }
  }, 3000);
})();
//...........................................................................
//..............................Preloader End................................
//...........................................................................

//...........................................................................
//..............................Navbar JS Start..............................
//...........................................................................
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-x-full");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
});

// Close other dropdowns when one is opened
dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isOpen = !content.classList.contains("hidden");

    // Close all dropdowns
    dropdownBtns.forEach((otherBtn) => {
      const otherContent = otherBtn.nextElementSibling;
      otherContent.classList.add("hidden");
      otherBtn.querySelector("i").classList.remove("rotate-180");
    });

    // Toggle the clicked dropdown
    if (!isOpen) {
      content.classList.remove("hidden");
      btn.querySelector("i").classList.add("rotate-180");
    }
  });
});

// Close sidebar on outside click
document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    !mobileMenu.classList.contains("-translate-x-full")
  ) {
    mobileMenu.classList.add("-translate-x-full");
    // Close all dropdowns when sidebar closes
    dropdownBtns.forEach((btn) => {
      const content = btn.nextElementSibling;
      content.classList.add("hidden");
      btn.querySelector("i").classList.remove("rotate-180");
    });
  }
});

// .............Language Selector............
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const dropdown = document.getElementById("language-dropdown");
  const flag = document.getElementById("language-flag");
  const text = document.getElementById("language-text");

  // Toggle dropdown visibility
  selector.querySelector("div").addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  // Handle language selection
  dropdown.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", (event) => {
      const selectedLang = event.currentTarget.getAttribute("data-lang");

      if (selectedLang === "en") {
        flag.src = "https://flagcdn.com/gb.svg";
        text.textContent = "EN";
      } else if (selectedLang === "es") {
        flag.src = "https://flagcdn.com/es.svg";
        text.textContent = "ES";
      } else if (selectedLang === "fr") {
        flag.src = "https://flagcdn.com/fr.svg";
        text.textContent = "FR";
      }

      dropdown.classList.add("hidden");
    });
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!selector.contains(event.target)) {
      dropdown.classList.add("hidden");
    }
  });
});
//...........................................................................
//..............................Navbar JS End................................
//...........................................................................
