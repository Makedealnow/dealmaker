(function () {
  function routeToResults(event) {
    var el = event.target.closest("a, button");
    if (!el) return;

    var text = (el.textContent || "").toLowerCase();
    var href = (el.getAttribute("href") || "").toLowerCase();
    var cls = (el.className || "").toString().toLowerCase();

    var routeWords = [
      "search", "search deals", "compare", "ai search", "view partner",
      "find deals", "find offers", "get quotes", "start", "lowest price"
    ];

    var shouldRoute = routeWords.some(function (word) {
      var slug = word.replace(/\s+/g, "-");
      return text.includes(word) || href.includes(slug) || cls.includes(slug);
    });

    if (shouldRoute && !text.includes("return") && !text.includes("home")) {
      event.preventDefault();
      window.location.href = "search-results.html#results";
    }
  }

  document.addEventListener("click", routeToResults, true);

  window.addEventListener("load", function () {
    if (/search-results\.html/i.test(window.location.pathname)) {
      var target =
        document.getElementById("results") ||
        document.querySelector(".search-results") ||
        document.querySelector(".results") ||
        document.querySelector(".results-section") ||
        document.querySelector("main");

      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: "instant", block: "start" });
          window.scrollBy(0, -80);
        }, 50);
      }
    }
  });
})();