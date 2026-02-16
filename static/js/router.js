/**
 * Minimal SPA router — swaps page content without full reload
 * so the fractal background canvas keeps running uninterrupted.
 */
(function () {
  "use strict";

  function swapContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Swap main content
    const newMain = doc.querySelector("main.main");
    const curMain = document.querySelector("main.main");
    if (newMain && curMain) {
      curMain.innerHTML = newMain.innerHTML;
    }

    // Update header (active nav links)
    const newHeader = doc.querySelector("header.header");
    const curHeader = document.querySelector("header.header");
    if (newHeader && curHeader) {
      curHeader.innerHTML = newHeader.innerHTML;
    }

    // Update page title
    const newTitle = doc.querySelector("title");
    if (newTitle) {
      document.title = newTitle.textContent;
    }

    // Update body class (list vs single page)
    const newBody = doc.querySelector("body");
    if (newBody) {
      document.body.className = newBody.className;
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  async function navigate(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return false;
      const html = await res.text();
      swapContent(html);
      history.pushState(null, "", url);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Intercept internal link clicks
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Skip external links, downloads, hash-only links, new-tab links
    if (
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("#") ||
      href.endsWith(".pdf")
    ) {
      return;
    }

    e.preventDefault();
    navigate(href);
  });

  // Handle browser back/forward
  window.addEventListener("popstate", async function () {
    try {
      const res = await fetch(location.href);
      if (res.ok) {
        const html = await res.text();
        swapContent(html);
      }
    } catch (e) {
      location.reload();
    }
  });
})();
