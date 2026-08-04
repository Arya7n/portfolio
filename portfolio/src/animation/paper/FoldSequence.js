/**
 * Timing for the paper resume sequence (ms).
 * No image slicing / letter-fold panels — screenshot stays whole.
 */

export const PAPER_TIMING = {
  pauseMs: 120,
  scanMs: 850,
  liftMs: 750,
  holdMs: 500,
  /** Whole-sheet soft curl into document proportions */
  curlMs: 900,
  documentMs: 650,
  presentMs: 700,
  tiltMs: 500,
  floatMs: 360,
  launchMs: 560,
  settleMs: 400,
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
