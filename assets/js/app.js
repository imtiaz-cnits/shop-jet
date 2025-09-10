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
const cartIcons = document.querySelectorAll(".cart-icon"); // multiple icons
const closeBtn = document.getElementById("close-sidebar-btn");
const cartItemCounts = document.querySelectorAll(".cart-item-count"); // multiple counts
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

  // Update all cart-item-count elements
  cartItemCounts.forEach((el) => {
    el.textContent = totalItems;
  });

  cartItemCountSidebar.textContent = totalItems;
}

// Event Listeners
cartIcons.forEach((icon) => {
  icon.addEventListener("click", openSidebar);
});
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
    0: { slidesPerView: 2.3, spaceBetween: 20 },
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
    0: { slidesPerView: 2.3, spaceBetween: 20 },
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
    0: { slidesPerView: 2.3, spaceBetween: 20 },
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
    0: { slidesPerView: 2.3, spaceBetween: 20 },
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
    0: { slidesPerView: 2.3, spaceBetween: 20 },
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
                  new RegExp(
                    query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                    "gi"
                  ),
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
    e.target.matches(
      'input[placeholder="Search for rice, sweets, snacks, Beverages or more..."]'
    );

  if (!isClickInside) {
    resultsBox.style.display = "none";
  }
});
//........Navbar Search Filter End..............................
//......................................................................

//......................................................................
//.................Product Page All Js Start...........................
//......................................................................

$(document).ready(function () {
  // Nice Select Initialization and Dropdown Position Fix
  $("#sort-by").niceSelect();

  const niceSelect = $("#sort-by").next(".nice-select");
  const dropdown = niceSelect.find(".list");

  function fixDropdownPosition() {
    const wrapper = niceSelect;

    dropdown.css({ visibility: "hidden", display: "block" });

    const rect = dropdown[0].getBoundingClientRect();
    const wrapperRect = wrapper[0].getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    dropdown.css({
      left: "auto",
      right: "auto",
      top: "auto",
      bottom: "auto",
    });

    if (wrapperRect.left + dropdown.outerWidth() > viewportWidth) {
      dropdown.css({ right: "0px", left: "auto" });
    } else {
      dropdown.css({ left: "0px", right: "auto" });
    }

    if (wrapperRect.bottom + dropdown.outerHeight() > viewportHeight) {
      dropdown.css({ bottom: "100%", top: "auto" });
    } else {
      dropdown.css({ top: "100%", bottom: "auto" });
    }

    dropdown.css({ visibility: "", display: "" });
  }

  fixDropdownPosition();

  niceSelect.on("click", fixDropdownPosition);

  $(window).on("resize", fixDropdownPosition);

  // Nice Select Initialization and Dropdown Position Fix

  // Brand select toggle
  $(".brand-logo").on("click", function () {
    $(this).toggleClass("border-purple-600 border-1");
    $(this)
      .siblings(".brand-check")
      .toggleClass("hidden flex items-center justify-center");
  });

  // Dual range slider
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const minValue = document.getElementById("minValue");
  const maxValue = document.getElementById("maxValue");
  const sliderTrack = document.getElementById("sliderTrack");
  const max = parseInt(maxRange.max);

  function fillTrack() {
    let minPercent = (minRange.value / max) * 100;
    let maxPercent = (maxRange.value / max) * 100;
    sliderTrack.style.left = minPercent + "%";
    sliderTrack.style.width = maxPercent - minPercent + "%";
  }

  minRange.addEventListener("input", function () {
    if (parseInt(minRange.value) >= parseInt(maxRange.value)) {
      minRange.value = maxRange.value - 10;
    }
    minValue.innerText = "€" + minRange.value;
    fillTrack();
  });

  maxRange.addEventListener("input", function () {
    if (parseInt(maxRange.value) <= parseInt(minRange.value)) {
      maxRange.value = parseInt(minRange.value) + 10;
    }
    maxValue.innerText = "€" + maxRange.value;
    fillTrack();
  });

  fillTrack();

  // Mobile filter toggle
  const filterToggle = $("#filterToggle");
  const filterMenu = $("#filterMenu");

  if ($(window).width() < 992) {
    filterMenu.addClass("max-h-0 opacity-0 pt-0 pb-0");
  }

  filterToggle.on("click", function () {
    if (filterMenu.hasClass("max-h-0")) {
      filterMenu
        .removeClass("max-h-0 opacity-0 pt-0 pb-0")
        .addClass("max-h-screen overflow-y-auto opacity-100 mt-6");
    } else {
      filterMenu
        .removeClass("max-h-screen opacity-100")
        .addClass("max-h-0 opacity-0 pt-0 pb-0");
    }
  });

  $(window).on("resize", function () {
    if ($(window).width() >= 992) {
      filterMenu
        .removeClass("max-h-0 opacity-0 pt-0 pb-0 max-h-screen opacity-100")
        .addClass("block");
    } else if (
      !filterMenu.hasClass("max-h-0") &&
      !filterMenu.hasClass("max-h-screen")
    ) {
      filterMenu.addClass("max-h-0 opacity-0 pt-0 pb-0");
    }
  });
});
//......................................................................
//.................Product Page All Js End..............................
//......................................................................

//......................................................................
//................. Single Product All Js End...........................
//......................................................................
let currentSlide = 0;
      const totalSlides = 4;
      let quantity = 1;

      function updateSlider() {
        const slider = document.getElementById("mainSlider");
        const containerWidth = slider.parentElement.offsetWidth;
        const slideWidth = slider.children[0].offsetWidth;

        if (window.innerWidth <= 1024) {
          const translateX =
            -currentSlide * slideWidth + (containerWidth - slideWidth) / 2;
          slider.style.transform = `translateX(${translateX}px)`;
        } else {
          const translateX = -currentSlide * 100;
          slider.style.transform = `translateX(${translateX}%)`;
        }

        // Update dots
        document.querySelectorAll(".slider-dot").forEach((dot, index) => {
          dot.classList.toggle("bg-emerald-600", index === currentSlide);
          dot.classList.toggle("bg-gray-300", index !== currentSlide);
        });

        // Update thumbnail borders via JS
        document.querySelectorAll(".thumbnail").forEach((thumb, index) => {
          thumb.style.borderColor = index === currentSlide ? "var(--primary-color)" : "#d1d5db";
        });
      }

      function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      }

      function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      }

      function goToSlide(index) {
        currentSlide = index;
        updateSlider();
      }

      function increaseQuantity() {
        quantity++;
        document.getElementById("quantity").textContent = quantity;
      }

      function decreaseQuantity() {
        if (quantity > 1) {
          quantity--;
          document.getElementById("quantity").textContent = quantity;
        }
      }

      function handleZoom(event, container) {
        if (window.innerWidth <= 1024) return;

        const rect = container.getBoundingClientRect();
        const image = container.querySelector(".zoom-image");
        const lens = container.querySelector(".zoom-lens");

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        const lensSize = 96; 
        lens.style.left = x - lensSize / 2 + "px";
        lens.style.top = y - lensSize / 2 + "px";

        const zoomLevel = 2;
        image.style.transform = `scale(${zoomLevel})`;
        image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      }

      function resetZoom(container) {
        const image = container.querySelector(".zoom-image");
        image.style.transform = "scale(1)";
        image.style.transformOrigin = "center";
      }

      window.addEventListener("resize", updateSlider);
      updateSlider();

      // Auto-slide every 5s
      setInterval(() => {
        nextSlide();
      }, 5000);
// let currentSlide = 0;
// const totalSlides = 4;
// let quantity = 1;

// function updateSlider() {
//   const slider = document.getElementById("mainSlider");
//   const containerWidth = slider.parentElement.offsetWidth;
//   const slideWidth = slider.children[0].offsetWidth;

//   if (window.innerWidth <= 1024) {
//     // Mobile: center the active slide
//     const translateX =
//       -currentSlide * slideWidth + (containerWidth - slideWidth) / 2;
//     slider.style.transform = `translateX(${translateX}px)`;
//   } else {
//     // Desktop: full width slides
//     const translateX = -currentSlide * 100;
//     slider.style.transform = `translateX(${translateX}%)`;
//   }

//   // Update dots
//   document.querySelectorAll(".slider-dot").forEach((dot, index) => {
//     dot.classList.toggle("bg-emerald-600", index === currentSlide);
//     dot.classList.toggle("bg-gray-300", index !== currentSlide);
//   });

//   // Update thumbnails
//   document.querySelectorAll(".thumbnail").forEach((thumb, index) => {
//     thumb.classList.toggle("border-red-600", index === currentSlide);
//     thumb.classList.toggle("border-transparent", index !== currentSlide);
//   });
// }

// function nextSlide() {
//   currentSlide = (currentSlide + 1) % totalSlides;
//   updateSlider();
// }

// function prevSlide() {
//   currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//   updateSlider();
// }

// function goToSlide(index) {
//   currentSlide = index;
//   updateSlider();
// }

// function increaseQuantity() {
//   quantity++;
//   document.getElementById("quantity").textContent = quantity;
// }

// function decreaseQuantity() {
//   if (quantity > 1) {
//     quantity--;
//     document.getElementById("quantity").textContent = quantity;
//   }
// }

// function handleZoom(event, container) {
//   if (window.innerWidth <= 1024) return; // disable zoom on mobile

//   const rect = container.getBoundingClientRect();
//   const image = container.querySelector(".zoom-image");
//   const lens = container.querySelector(".zoom-lens");

//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;

//   const xPercent = (x / rect.width) * 100;
//   const yPercent = (y / rect.height) * 100;

//   const lensSize = 96; // w-24 h-24
//   lens.style.left = x - lensSize / 2 + "px";
//   lens.style.top = y - lensSize / 2 + "px";

//   const zoomLevel = 2;
//   image.style.transform = `scale(${zoomLevel})`;
//   image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
// }

// function resetZoom(container) {
//   const image = container.querySelector(".zoom-image");
//   image.style.transform = "scale(1)";
//   image.style.transformOrigin = "center";
// }

// // Update slider on window resize to recalc mobile centering
// window.addEventListener("resize", updateSlider);

// // Initial call to set up the slider
// updateSlider();

// // Auto-slide functionality (optional)
// setInterval(() => {
//   nextSlide();
// }, 5000);
//......................................................................
//................. Single Product All Js End...........................
//......................................................................
