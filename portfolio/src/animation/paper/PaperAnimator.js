/**
 * Geometry helpers — screenshot keeps viewport aspect (no crop).
 * A4 is only used for the final Resume.pdf card.
 */

export const A4_RATIO = 210 / 297;

/**
 * Floating screenshot size — same aspect as the viewport, just scaled down.
 * Nothing is cropped; "Aryan" and the full page stay intact.
 * @param {number} viewW
 * @param {number} viewH
 */
export function getScreenshotSize(viewW, viewH) {
  const scale = 0.88;
  return {
    width: Math.round(viewW * scale),
    height: Math.round(viewH * scale),
  };
}

/**
 * Final A4 document card.
 * @param {number} viewW
 * @param {number} viewH
 */
export function getA4Size(viewW, viewH) {
  const maxH = Math.min(viewH * 0.66, 560);
  const maxW = Math.min(viewW * 0.38, 360);
  let height = maxH;
  let width = height * A4_RATIO;
  if (width > maxW) {
    width = maxW;
    height = width / A4_RATIO;
  }
  return { width, height };
}

/**
 * @param {number} viewW
 * @param {number} viewH
 */
export function getLaunchTarget(viewW, viewH) {
  return {
    x: viewW * 0.4,
    y: -(viewH * 0.52 + 36),
  };
}

export const PAPER_EASE = [0.22, 1, 0.36, 1];
export const FOLD_EASE = [0.33, 0.0, 0.2, 1];
export const LAUNCH_EASE = [0.5, 0.0, 0.8, 0.1];
