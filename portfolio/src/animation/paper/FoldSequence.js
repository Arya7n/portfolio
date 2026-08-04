/**
 * Timing for the paper resume sequence (ms).
 * Tuned short + smooth — total motion ≈ 3.2s after capture.
 */

export const PAPER_TIMING = {
  pauseMs: 80,
  liftMs: 480,
  holdMs: 200,
  curlMs: 520,
  documentMs: 320,
  presentMs: 420,
  tiltMs: 280,
  floatMs: 160,
  launchMs: 400,
  settleMs: 260,
};

/** @deprecated kept empty so old imports don't break */
export const FOLD_STEPS = [];

/**
 * @typedef {'idle' | 'pause' | 'scan' | 'lift' | 'hold' | 'curl' | 'document' | 'present' | 'tilt' | 'float' | 'launch' | 'settle' | 'done'} PaperPhase
 */

export const PAPER_PHASES = {
  IDLE: "idle",
  PAUSE: "pause",
  SCAN: "scan",
  LIFT: "lift",
  HOLD: "hold",
  CURL: "curl",
  DOCUMENT: "document",
  PRESENT: "present",
  TILT: "tilt",
  FLOAT: "float",
  LAUNCH: "launch",
  SETTLE: "settle",
  DONE: "done",
};
