import { captureViewport } from "../capture";
import { PAPER_PHASES, PAPER_TIMING } from "./FoldSequence";
import {
  lockPage,
  revealPage,
  triggerResumeDownload,
  unlockPage,
  wait,
} from "./pageLock";

/**
 * @typedef {import('./FoldSequence.js').PaperPhase} PaperPhase
 */

/**
 * @typedef {object} PaperAnimState
 * @property {PaperPhase} phase
 * @property {boolean} active
 * @property {string | null} imageUrl
 * @property {number} foldIndex
 * @property {number[]} folded
 * @property {boolean} showTitle
 * @property {boolean} showStamp
 * @property {boolean} launching
 * @property {boolean} downloadTriggered
 * @property {number} viewportW
 * @property {number} viewportH
 */

const initialState = () => ({
  phase: PAPER_PHASES.IDLE,
  active: false,
  imageUrl: null,
  foldIndex: -1,
  folded: [],
  showTitle: false,
  showStamp: false,
  launching: false,
  downloadTriggered: false,
  viewportW: typeof window !== "undefined" ? window.innerWidth : 1280,
  viewportH: typeof window !== "undefined" ? window.innerHeight : 800,
});

/**
 * Screenshot → floating sheet → Resume.pdf → launch.
 * Never slices the capture into fold panels.
 */
export class ResumeDownloadController {
  constructor() {
    /** @type {PaperAnimState} */
    this.state = initialState();
    /** @type {Set<() => void>} */
    this.listeners = new Set();
    this.running = false;
    /** @type {ReturnType<typeof lockPage> | null} */
    this.lockState = null;
    /** @type {string | null} */
    this.resumeUrl = null;
    /** @type {string | null} */
    this._objectUrl = null;
  }

  get isBusy() {
    return this.running;
  }

  getSnapshot = () => this.state;

  /** @param {() => void} listener */
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  /** @param {Partial<PaperAnimState>} patch */
  setState(patch) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((l) => l());
  }

  /**
   * @param {{ resumeUrl: string }} opts
   */
  async start({ resumeUrl }) {
    if (this.running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      triggerResumeDownload(resumeUrl);
      return;
    }

    this.running = true;
    this.resumeUrl = resumeUrl;

    this.setState({
      ...initialState(),
      active: false,
      phase: PAPER_PHASES.PAUSE,
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
    });

    try {
      const { canvas: shot, restore } = await captureViewport(
        document.getElementById("portfolio-root") || document.body
      );
      if (!this.running) {
        restore();
        return;
      }

      // Hide live page while still frozen, THEN restore motion under the hide
      this.lockState = lockPage();
      restore();

      this.revokeUrl();
      // PNG keeps text sharp — no JPEG smear
      this._objectUrl = shot.toDataURL("image/png");

      this.setState({
        active: true,
        imageUrl: this._objectUrl,
        phase: PAPER_PHASES.PAUSE,
        viewportW: window.innerWidth,
        viewportH: window.innerHeight,
      });

      // Brief exact freeze — screen looks unchanged
      await wait(PAPER_TIMING.pauseMs);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.LIFT });
      await wait(PAPER_TIMING.liftMs);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.HOLD });
      await wait(PAPER_TIMING.holdMs);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.CURL });
      await wait(PAPER_TIMING.curlMs);
      if (!this.running) return;

      this.setState({
        phase: PAPER_PHASES.DOCUMENT,
        showTitle: false,
        showStamp: false,
      });
      await wait(PAPER_TIMING.documentMs);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.PRESENT, showTitle: true });
      await wait(PAPER_TIMING.presentMs * 0.5);
      if (!this.running) return;

      this.setState({ showStamp: true });
      await wait(PAPER_TIMING.presentMs * 0.5);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.TILT });
      await wait(PAPER_TIMING.tiltMs);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.FLOAT });
      await wait(PAPER_TIMING.floatMs);
      if (!this.running) return;

      this.setState({ phase: PAPER_PHASES.LAUNCH, launching: true });

      const launch = PAPER_TIMING.launchMs;
      await wait(launch * 0.88);
      if (!this.running) return;
      if (this.resumeUrl) {
        triggerResumeDownload(this.resumeUrl);
        this.setState({ downloadTriggered: true });
      }
      await wait(launch * 0.12);
      if (!this.running) return;

      // Reveal live page under the sheet, then fade the overlay away
      revealPage(this.lockState);
      this.setState({
        phase: PAPER_PHASES.SETTLE,
        launching: false,
        showTitle: false,
        showStamp: false,
      });
      await wait(PAPER_TIMING.settleMs);

      this.finish(false);
    } catch {
      this.finish(true);
    }
  }

  /**
   * @param {boolean} forceDownload
   */
  finish(forceDownload) {
    if (forceDownload && this.resumeUrl && !this.state.downloadTriggered) {
      triggerResumeDownload(this.resumeUrl);
    }

    // Put the real page back before removing the overlay (seamless return)
    revealPage(this.lockState);
    unlockPage(this.lockState);
    this.lockState = null;

    this.setState({
      ...initialState(),
      active: false,
      phase: PAPER_PHASES.DONE,
    });

    this.revokeUrl();
    this.running = false;

    queueMicrotask(() => {
      this.setState(initialState());
    });
  }

  revokeUrl() {
    this._objectUrl = null;
  }

  destroy() {
    this.running = false;
    unlockPage(this.lockState);
    this.lockState = null;
    this.revokeUrl();
    this.setState(initialState());
  }
}

/** @type {ResumeDownloadController | null} */
let singleton = null;

export function getResumeDownloadController() {
  if (!singleton) singleton = new ResumeDownloadController();
  return singleton;
}
