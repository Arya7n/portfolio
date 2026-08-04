/**
 * Scroll / pointer lock with scrollbar-gap compensation (no layout jump).
 * Hides the live portfolio so the screenshot can replace it 1:1 — no overlap.
 */

export function lockPage() {
  const lockedScrollY = window.scrollY;
  const scrollbarGap = Math.max(
    0,
    window.innerWidth - document.documentElement.clientWidth
  );

  /** @type {HTMLElement[]} */
  const padded = [document.body];

  if (scrollbarGap > 0) {
    document.body.style.paddingRight = `${scrollbarGap}px`;
    const header = document.querySelector("header");
    if (header instanceof HTMLElement) {
      header.style.paddingRight = `${scrollbarGap}px`;
      padded.push(header);
    }
  }

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";

  const root = document.getElementById("portfolio-root");
  if (root) {
    root.style.pointerEvents = "none";
    // Hide live DOM so screenshot isn't stacked on top of itself
    root.style.visibility = "hidden";
  }

  return {
    lockedScrollY,
    scrollbarGap,
    padded,
    root,
  };
}

/**
 * @param {{ lockedScrollY: number, padded: HTMLElement[], root?: HTMLElement | null } | null} lockState
 */
export function unlockPage(lockState) {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";

  if (lockState?.root) {
    lockState.root.style.pointerEvents = "";
    lockState.root.style.visibility = "";
  }

  if (lockState?.padded) {
    for (const el of lockState.padded) {
      el.style.paddingRight = "";
    }
  }

  if (lockState) {
    window.scrollTo(0, lockState.lockedScrollY);
  }
}

/**
 * Reveal the live page under the overlay before the overlay fades out.
 * @param {{ root?: HTMLElement | null } | null} lockState
 */
export function revealPage(lockState) {
  if (lockState?.root) {
    lockState.root.style.visibility = "";
  }
}

/** @param {string} url */
export function triggerResumeDownload(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop() || "resume.pdf";
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** @param {number} ms */
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
