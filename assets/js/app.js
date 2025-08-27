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
