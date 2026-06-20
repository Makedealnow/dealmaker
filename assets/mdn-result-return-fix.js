(function () {
  function toResults(e) {
    var el = e.target.closest("a, button");
    if (!el) return;

    var text = (el.textContent || "").toLowerCase().trim();
    var cls = (el.className || "").toString().toLowerCase();
    var href = (el.getAttribute("href") || "").toLowerCase();

    var shouldGo =
      text.includes("compare") ||
      text.includes("ai search") ||
      text.includes("search deals") ||
      text.includes("search") ||
      text.includes("find deals") ||
      text.includes("get quotes") ||
      text.includes("view partner") ||
      cls.includes("compare") ||
      cls.includes("ai-search") ||
      href.includes("compare") ||
      href.includes("ai-search");

    if (shouldGo && !text.includes("return")) {
      e.preventDefault();
      window.location.href = "search-results.html#results";
    }
  }

  document.addEventListener("click", toResults, true);

  window.addEventListener("load", function () {
    if (/search-results\.html/i.test(window.location.pathname)) {
      var target =
        document.getElementById("results") ||
        document.querySelector(".search-results") ||
        document.querySelector(".results") ||
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