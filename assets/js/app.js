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
// === Inject CSS from JS ===
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease forwards;
  -webkit-animation: fadeIn 0.3s ease forwards;
}
`;
document.head.appendChild(style);

// === Selectors ===
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
const backBtns = document.querySelectorAll(".back-btn");

// === Open Sidebar ===
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-x-full");
  mobileMenu.classList.add("animate-fadeIn"); // apply fadeIn
});

// === Close Sidebar ===
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
  // remove animation after hide
  mobileMenu.classList.remove("animate-fadeIn");

  // Hide any open submenus when the main menu closes
  document.querySelectorAll(".dropdown-panel").forEach((content) => {
    content.classList.add("translate-x-full");
  });
});

// === Open Submenu ===
dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);

    // Slide the target content into view smoothly
    targetContent.classList.remove("translate-x-full");
    targetContent.classList.add("animate-fadeIn");
  });
});

// === Back to Main Menu ===
backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentContent = btn.closest(".dropdown-panel");
    currentContent.classList.add("translate-x-full");
    currentContent.classList.remove("animate-fadeIn");
  });
});

// === Close Sidebar on Outside Click ===
document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    !mobileMenu.classList.contains("-translate-x-full")
  ) {
    mobileMenu.classList.add("-translate-x-full");
    mobileMenu.classList.remove("animate-fadeIn");

    // Hide any open submenus when the main menu closes
    document.querySelectorAll(".dropdown-panel").forEach((content) => {
      content.classList.add("translate-x-full");
      content.classList.remove("animate-fadeIn");
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

//...........................................................................
//...........................Cart Sidebar JS Start.........................
//...........................................................................

const sidebar = document.getElementById("cart-sidebar");
const overlay = document.getElementById("overlay");
const cartIcon = document.getElementById("cart-icon");
const closeBtn = document.getElementById("close-sidebar-btn");
const cartItemCount = document.getElementById("cart-item-count");
const cartItemCountSidebar = document.getElementById("cart-item-count-sidebar");
const subtotalElement = document.getElementById("subtotal");
const checkoutPriceElement = document.getElementById("checkout-price");
const cartItemsContainer = document.getElementById("cart-items");

// Functions
function openSidebar() {
  sidebar.style.transform = "translateX(0)";
  overlay.style.display = "block";
}

function closeSidebar() {
  sidebar.style.transform = "translateX(100%)";
  overlay.style.display = "none";
}

function updateCartTotal() {
  let total = 0;
  const itemElements = cartItemsContainer.querySelectorAll(
    ".cart-product-items"
  );
  let totalItems = 0;

  itemElements.forEach((item) => {
    const qtyElement = item.querySelector(".item-qty");
    const priceElement = item.querySelector(".discounted-price");
    const qty = parseInt(qtyElement.textContent, 10);
    const price = parseFloat(priceElement.dataset.price);
    total += qty * price;
    totalItems += qty;
  });

  subtotalElement.textContent = `${total.toFixed(2)}€`;
  checkoutPriceElement.textContent = `${total.toFixed(2)}€`;
  cartItemCount.textContent = totalItems;
  cartItemCountSidebar.textContent = totalItems;
}

// Event Listeners
cartIcon.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Add event listeners for quantity buttons and remove buttons
cartItemsContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const itemElement = button.closest(".cart-product-items");
  if (!itemElement) return;

  if (button.classList.contains("remove-item")) {
    itemElement.remove();
  } else {
    const qtyElement = itemElement.querySelector(".item-qty");
    let currentQty = parseInt(qtyElement.textContent, 10);
    if (button.classList.contains("increase-qty")) {
      currentQty++;
      qtyElement.textContent = currentQty;
    } else if (button.classList.contains("decrease-qty")) {
      if (currentQty > 1) {
        currentQty--;
        qtyElement.textContent = currentQty;
      }
    }
  }

  updateCartTotal();
});

// Initial calculation
updateCartTotal();
//...........................................................................
//...........................Cart Sidebar JS End.........................
//...........................................................................

//...........................................................................
//.........................Hero Slider JS Start..............................
//...........................................................................
const swiper = new Swiper(".myHeroSwiper", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//...........................................................................
//.........................Hero Slider JS End................................
//...........................................................................

//...........................................................................
//.........................Product Slider JS Start.......................
//...........................................................................
// Initialize Swiper for .summer-swiper
const summerSwiper = new Swiper(".summer-swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 2, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1100: { slidesPerView: 4, spaceBetween: 20 },
  },
  navigation: {
    nextEl: ".summer-next",
    prevEl: ".summer-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Initialize Swiper for .best-seller-swiper
const bestSellerSwiper = new Swiper(".best-seller-swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 2, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1100: { slidesPerView: 4, spaceBetween: 20 },
  },
  navigation: {
    nextEl: ".best-next",
    prevEl: ".best-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Initialize Swiper for .fruits-swiper
const fruitsSellerSwiper = new Swiper(".fruits-swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 2, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1100: { slidesPerView: 4, spaceBetween: 20 },
  },
  navigation: {
    nextEl: ".fruits-next",
    prevEl: ".fruits-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Initialize Swiper for .frozen-swiper
const frozenSellerSwiper = new Swiper(".frozen-swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 2, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1100: { slidesPerView: 4, spaceBetween: 20 },
  },
  navigation: {
    nextEl: ".frozen-next",
    prevEl: ".frozen-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Initialize Swiper for .arrival-swiper
const arrivalSellerSwiper = new Swiper(".arrival-swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
    0: { slidesPerView: 2, spaceBetween: 20 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1100: { slidesPerView: 4, spaceBetween: 20 },
  },
  navigation: {
    nextEl: ".arrival-next",
    prevEl: ".arrival-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
//...........................................................................
//.........................Product Slider JS End.........................
//...........................................................................

//...........................................................................
//.........................Hot Deals Slider JS End.........................
//...........................................................................
const dealsSwiper = new Swiper(".dealsSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});
//...........................................................................
//.........................Hot Deals Slider JS End.........................
//...........................................................................

//...........................................................................
//.........................Back To Top JS Start.........................
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//...........................................................................
//...........................................................................
//.........................Back To Top JS End.........................
//...........................................................................


//......................................................................
//..........................Navbar Search Filter Start................................

// Select the search input and results container
const searchInputs = document.querySelectorAll(
  'input[placeholder="Search for rice, sweets, snacks, Beverages or more..."]'
);
const resultsBox = document.getElementById("search-results");

// Debounce function to limit search execution
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Add input event listener to each search input
searchInputs.forEach((input) => {
  input.addEventListener(
    "input",
    debounce(() => {
      const query = input.value.trim().toLowerCase();
      resultsBox.innerHTML = "";

      if (!query) {
        resultsBox.style.display = "none";
        return;
      }

      // Collect unique text matches from elements outside nav
      let matches = new Set();
      document
        .querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, li, div")
        .forEach((el) => {
          if (el.closest("nav")) return;

          const text = el.innerText.trim();
          if (text && text.toLowerCase().includes(query)) {
            matches.add(text);
          }
        });
      matches = [...matches];

      if (matches.length > 0) {
        resultsBox.style.display = "block";
        resultsBox.innerHTML = matches
          .slice(0, 10)
          .map(
            (t) => `<div style="padding:5px 0; border-bottom:1px solid #eee;">
                ${t.replace(
                  new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
                  (match) => `<mark>${match}</mark>`
                )}
              </div>`
          )
          .join("");
      } else {
        resultsBox.style.display = "block";
        resultsBox.innerHTML = `<div style="padding:5px; color:#777;">No results found</div>`;
      }
    }, 300)
  );
});

// Handle outside click to close search results
document.addEventListener("click", (e) => {
  const resultsBox = document.getElementById("search-results");
  const isClickInside =
    resultsBox.contains(e.target) ||
    e.target.matches('input[placeholder="Search for rice, sweets, snacks, Beverages or more..."]');

  if (!isClickInside) {
    resultsBox.style.display = "none";
  }
});
//........Navbar Search Filter End..............................
//......................................................................
