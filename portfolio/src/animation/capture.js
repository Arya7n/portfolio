/**
 * Capture a clean 1:1 viewport freeze.
 * Framer Motion transforms make html2canvas paint ghost glyphs.
 * We flatten the DOM, capture, and let the caller restore after the page is hidden.
 */

/**
 * @param {HTMLElement} root
 * @returns {() => void}
 */
function freezeDomForCapture(root) {
  /** @type {Array<() => void>} */
  const restorers = [];

  const freezeStyle = document.createElement("style");
  freezeStyle.setAttribute("data-resume-capture-freeze", "true");
  freezeStyle.textContent = `
    #portfolio-root, #portfolio-root * {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(freezeStyle);
  restorers.push(() => freezeStyle.remove());

  root.querySelectorAll("h1, h2, h3").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const prevOverflow = node.style.overflow;
    const prevLineHeight = node.style.lineHeight;
    node.style.overflow = "visible";
    if (node.tagName === "H1") node.style.lineHeight = "1.05";
    restorers.push(() => {
      node.style.overflow = prevOverflow;
      node.style.lineHeight = prevLineHeight;
    });
  });

  root.querySelectorAll("*").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const cs = window.getComputedStyle(node);
    const hasTransform = cs.transform && cs.transform !== "none";
    const hasFilter = cs.filter && cs.filter !== "none";
    const hasPerspective = cs.perspective && cs.perspective !== "none";

    if (!hasTransform && !hasFilter && !hasPerspective) return;

    const prev = {
      transform: node.style.transform,
      filter: node.style.filter,
      transformOrigin: node.style.transformOrigin,
      perspective: node.style.perspective,
      transformStyle: node.style.transformStyle,
      willChange: node.style.willChange,
      opacity: node.style.opacity,
    };

    node.style.transform = "none";
    node.style.filter = "none";
    node.style.perspective = "none";
    node.style.transformStyle = "flat";
    node.style.willChange = "auto";
    if (parseFloat(cs.opacity) > 0.85) {
      node.style.opacity = "1";
    }

    restorers.push(() => {
      node.style.transform = prev.transform;
      node.style.filter = prev.filter;
      node.style.transformOrigin = prev.transformOrigin;
      node.style.perspective = prev.perspective;
      node.style.transformStyle = prev.transformStyle;
      node.style.willChange = prev.willChange;
      node.style.opacity = prev.opacity;
    });
  });

  return () => {
    for (let i = restorers.length - 1; i >= 0; i--) restorers[i]();
  };
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * @param {HTMLElement} [root]
 * @returns {Promise<{ canvas: HTMLCanvasElement, restore: () => void }>}
 */
export async function captureViewport(root) {
  const { default: html2canvas } = await import("html2canvas");

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const target =
    root ||
    document.getElementById("portfolio-root") ||
    document.body;

  const restore = freezeDomForCapture(target);
  await nextFrame();
  await nextFrame();

  try {
    const canvas = await html2canvas(target, {
      backgroundColor: "#f3f3f0",
      useCORS: true,
      allowTaint: true,
      logging: false,
      scale: dpr,
      width,
      height,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: height,
      x: 0,
      y: window.scrollY,
      scrollX: 0,
      scrollY: -window.scrollY,
      foreignObjectRendering: false,
      imageTimeout: 2500,
      ignoreElements: (el) => {
        if (!el) return false;
        if (el.dataset?.resumeOverlay === "true") return true;
        if (el.id === "resume-download-overlay") return true;
        if (el.getAttribute?.("data-resume-capture-freeze") != null) return true;
        return false;
      },
      onclone: (_doc, cloned) => {
        const rootEl =
          cloned.querySelector("#portfolio-root") || cloned.body || cloned;

        rootEl.querySelectorAll("h1, h2, h3").forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          el.style.overflow = "visible";
          if (el.tagName === "H1") el.style.lineHeight = "1.05";
        });

        rootEl.querySelectorAll("*").forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          el.style.transform = "none";
          el.style.filter = "none";
          el.style.perspective = "none";
          el.style.transformStyle = "flat";
          el.style.animation = "none";
          el.style.transition = "none";
        });
      },
    });

    // Caller must restore() after hiding the live page
    return { canvas, restore };
  } catch (err) {
    restore();
    throw err;
  }
}
