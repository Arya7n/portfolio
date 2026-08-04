/** @param {number} t */
export const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** @param {number} t */
export const easeInCubic = (t) => t * t * t;

/** @param {number} t */
export const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/** @param {number} t */
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/** @param {number} t */
export const easeInQuint = (t) => t * t * t * t * t;

/** @param {number} t */
export const easeOutQuint = (t) => 1 - (1 - t) ** 5;

/** @param {number} t */
export const easeInOutQuint = (t) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 - (-2 * t + 2) ** 5 / 2;

/** Ken Perlin smoothstep */
export const smoothstep = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

/** Smootherstep — even softer cinematic ramp */
export const smootherstep = (t) => {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

/**
 * Frame-rate independent exponential smoothing.
 * @param {number} current
 * @param {number} target
 * @param {number} dt
 * @param {number} speed higher = snappier
 */
export const damp = (current, target, dt, speed) =>
  lerp(current, target, 1 - Math.exp(-speed * dt));

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
export const lerp = (a, b, t) => a + (b - a) * t;
