import { Orb } from "./Orb";
import { DISSOLVE_MODE, ParticleSystem } from "./ParticleSystem";
import { captureViewport } from "./capture";
import { clamp01, easeInQuint, lerp, smootherstep } from "./easing";

/** @typedef {'idle' | 'collapse' | 'merge' | 'pause' | 'launch' | 'reform' | 'done'} Phase */

const TIMING = {
  collapseMs: 1400,
  mergeMs: 680,
  pauseMs: 160,
  launchMs: 480,
  reformMs: 1100,
};

/**
 * Owns the RAF loop and phase machine for the resume download sequence.
 */
export class AnimationController {
  constructor() {
    /** @type {HTMLCanvasElement | null} */
    this.canvas = null;
    /** @type {CanvasRenderingContext2D | null} */
    this.ctx = null;
    /** @type {HTMLElement | null} */
    this.rootEl = null;
    this.particles = new ParticleSystem();
    this.orb = new Orb();
    /** @type {Phase} */
    this.phase = "idle";
    this.running = false;
    this.rafId = 0;
    this.phaseStartedAt = 0;
    this.lastTs = 0;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    /** @type {string | null} */
    this.resumeUrl = null;
    this.downloadTriggered = false;
    this.lockedScrollY = 0;
    this.scrollbarGap = 0;
    /** @type {HTMLElement[]} */
    this.paddedEls = [];
    /** @type {(() => void) | null} */
    this.onComplete = null;
    /** @type {((active: boolean) => void) | null} */
    this.onOverlayChange = null;

    /** @type {HTMLCanvasElement | null} */
    this.captureCanvas = null;
    this.pageFade = 1;

    this.launchFromX = 0;
    this.launchFromY = 0;
    this.launchToX = 0;
    this.launchToY = 0;
  }

  /**
   * @param {{ canvas: HTMLCanvasElement, rootEl?: HTMLElement | null, onOverlayChange?: (active: boolean) => void }} opts
   */
  attach({ canvas, rootEl = null, onOverlayChange = null }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.rootEl = rootEl;
    this.onOverlayChange = onOverlayChange;
    this.setOverlayVisible(false);
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    if (this.ctx) {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
  }

  get isBusy() {
    return this.running;
  }

  /**
   * Imperative overlay visibility — avoids a React-state frame of empty canvas.
   * @param {boolean} visible
   */
  setOverlayVisible(visible) {
    if (!this.canvas) return;
    this.canvas.style.opacity = visible ? "1" : "0";
    this.canvas.style.pointerEvents = visible ? "auto" : "none";
    this.canvas.setAttribute("aria-hidden", visible ? "false" : "true");
    this.onOverlayChange?.(visible);
  }

  /**
   * Paint the page capture full-bleed with no dark wash underneath.
   */
  paintCaptureCover() {
    if (!this.ctx || !this.captureCanvas) return;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(this.captureCanvas, 0, 0, this.width, this.height);
  }

  /**
   * @param {{ resumeUrl: string, onComplete?: () => void }} opts
   */
  async start({ resumeUrl, onComplete }) {
    if (this.running || !this.canvas || !this.ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      triggerDownload(resumeUrl);
      onComplete?.();
      return;
    }

    this.running = true;
    this.resumeUrl = resumeUrl;
    this.onComplete = onComplete ?? null;
    this.downloadTriggered = false;
    this.pageFade = 1;
    this.captureCanvas = null;
    this.resize();

    // Keep real page visible — no overlay, no scroll lock yet (avoids flicker/jump)
    this.setOverlayVisible(false);
    this.setPhase("idle");

    try {
      const { canvas: shot, restore } = await captureViewport(
        document.getElementById("portfolio-root") || document.body
      );
      if (!this.running) {
        restore();
        return;
      }

      this.captureCanvas = shot;

      if (DISSOLVE_MODE === "symbols") {
        this.particles.spawnAsCodeSymbols(this.width, this.height, shot);
      } else {
        this.particles.spawnFromImage(shot, this.width, this.height);
      }

      // Seamless handoff: paint snapshot → show canvas → hide DOM → lock scroll
      this.paintCaptureCover();
      this.lockInteraction();
      restore();
      this.setOverlayVisible(true);
      this.hidePage();

      this.orb.appear(this.width * 0.5, this.height * 0.5);
      this.orb.alpha = 0;
      this.orb.radius = 0;
      this.orb.targetRadius = 30;

      this.setPhase("collapse");
      this.lastTs = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    } catch {
      this.finish(true);
    }
  }

  /** @param {Phase} phase */
  setPhase(phase) {
    this.phase = phase;
    this.phaseStartedAt = performance.now();
  }

  /** @param {number} ts */
  tick = (ts) => {
    if (!this.running || !this.ctx) return;

    const dt = Math.min(0.033, (ts - this.lastTs) / 1000 || 0.016);
    this.lastTs = ts;
    const elapsed = ts - this.phaseStartedAt;

    switch (this.phase) {
      case "collapse": {
        const t = clamp01(elapsed / TIMING.collapseMs);
        const dissolve = smootherstep(clamp01(t / 0.22));
        this.pageFade = 1 - dissolve;

        this.particles.updateCollapse(t, dt);
        const mergeHint = smootherstep(clamp01((t - 0.5) / 0.5));
        this.orb.update(dt, mergeHint * 0.4);

        this.renderFrame(() => {
          this.drawCapture(this.pageFade);
          this.particles.draw(this.ctx, 1);
          this.orb.draw(this.ctx);
        });
        if (t >= 1) this.setPhase("merge");
        break;
      }

      case "merge": {
        const t = clamp01(elapsed / TIMING.mergeMs);
        this.pageFade = 0;
        this.particles.updateMerge(t, dt);
        this.orb.update(dt, 0.4 + smootherstep(t) * 0.6);
        this.renderFrame(() => {
          this.particles.draw(this.ctx, 0.55);
          this.orb.draw(this.ctx);
        });
        if (t >= 1) {
          this.launchFromX = this.width * 0.5;
          this.launchFromY = this.height * 0.5;
          this.launchToX = this.width + 52;
          this.launchToY = -60;
          this.setPhase("pause");
        }
        break;
      }

      case "pause": {
        this.orb.update(dt, 1);
        this.orb.setPosition(this.launchFromX, this.launchFromY);
        this.renderFrame(() => this.orb.draw(this.ctx));
        if (elapsed >= TIMING.pauseMs) this.setPhase("launch");
        break;
      }

      case "launch": {
        const t = clamp01(elapsed / TIMING.launchMs);
        const e = easeInQuint(t);
        const x = lerp(this.launchFromX, this.launchToX, e);
        const y = lerp(this.launchFromY, this.launchToY, e);
        this.orb.setPosition(x, y, true);
        this.orb.update(dt, 1);
        this.orb.targetRadius = lerp(30, 9, e);

        this.renderFrame(() => {
          this.drawStreaks(x, y, e);
          this.orb.draw(this.ctx, { streak: true, blurAmount: 2.5 + e * 7 });
        });

        if (t > 0.7 && !this.downloadTriggered && this.resumeUrl) {
          this.downloadTriggered = true;
          triggerDownload(this.resumeUrl);
        }

        if (t >= 1) {
          this.orb.hide();
          this.orb.targetRadius = 30;
          for (let i = 0; i < this.particles.count; i++) {
            const p = this.particles.pool[i];
            p.x = this.width * 0.5;
            p.y = this.height * 0.5;
            p.a = 0;
            p.active = true;
          }
          this.setPhase("reform");
        }
        break;
      }

      case "reform": {
        const t = clamp01(elapsed / TIMING.reformMs);
        this.particles.updateReform(t, dt);

        const pageIn = smootherstep(clamp01((t - 0.5) / 0.5));
        this.pageFade = pageIn;
        const fieldFade = 1 - smootherstep(clamp01((t - 0.65) / 0.35));

        this.renderFrame(() => {
          this.drawCapture(this.pageFade);
          if (fieldFade > 0.02) {
            this.particles.draw(this.ctx, 1, fieldFade);
          }
        });

        if (t >= 1) {
          this.finish(false);
          return;
        }
        break;
      }

      default:
        break;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  /**
   * @param {number} alpha
   */
  drawCapture(alpha) {
    if (!this.ctx || !this.captureCanvas || alpha < 0.01) return;
    this.ctx.save();
    this.ctx.globalAlpha = clamp01(alpha);
    this.ctx.drawImage(this.captureCanvas, 0, 0, this.width, this.height);
    this.ctx.restore();
  }

  /**
   * @param {() => void} drawContent
   */
  renderFrame(drawContent) {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    // Only dark wash once the page capture has dissolved away
    if (this.pageFade < 0.98) {
      this.ctx.fillStyle = `rgba(12, 14, 13, ${0.94 * (1 - this.pageFade)})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    drawContent();
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} e
   */
  drawStreaks(x, y, e) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const dx = this.launchToX - this.launchFromX;
    const dy = this.launchToY - this.launchFromY;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 12; i++) {
      const spread = (i - 5.5) * (2.5 + e * 3.5);
      const back = 24 + e * 100 + i * 5;
      const sx = x - ux * back + -uy * spread;
      const sy = y - uy * back + ux * spread;
      const g = ctx.createLinearGradient(sx, sy, x, y);
      g.addColorStop(0, "rgba(120, 200, 170, 0)");
      g.addColorStop(1, `rgba(180, 230, 205, ${0.07 + e * 0.14})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1 + e * 0.8;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(x - ux * 8, y - uy * 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  lockInteraction() {
    this.lockedScrollY = window.scrollY;
    this.scrollbarGap = Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth
    );

    // Apply padding BEFORE hiding overflow so content doesn't jump
    this.paddedEls = [document.body];
    if (this.scrollbarGap > 0) {
      document.body.style.paddingRight = `${this.scrollbarGap}px`;
      const header = document.querySelector("header");
      if (header instanceof HTMLElement) {
        header.style.paddingRight = `${this.scrollbarGap}px`;
        this.paddedEls.push(header);
      }
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  }

  unlockInteraction() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";

    for (let i = 0; i < this.paddedEls.length; i++) {
      this.paddedEls[i].style.paddingRight = "";
    }
    this.paddedEls = [];
    this.scrollbarGap = 0;

    window.scrollTo(0, this.lockedScrollY);
  }

  hidePage() {
    if (this.rootEl) {
      this.rootEl.style.visibility = "hidden";
    }
  }

  showPage() {
    if (this.rootEl) {
      this.rootEl.style.visibility = "";
    }
  }

  /**
   * @param {boolean} forceDownload
   */
  finish(forceDownload) {
    if (forceDownload && this.resumeUrl && !this.downloadTriggered) {
      triggerDownload(this.resumeUrl);
      this.downloadTriggered = true;
    }

    cancelAnimationFrame(this.rafId);
    this.rafId = 0;

    // Exit without flash: restore DOM under the still-visible capture, then drop overlay
    if (this.captureCanvas) {
      this.paintCaptureCover();
    }
    this.showPage();
    this.unlockInteraction();
    this.setOverlayVisible(false);

    this.particles.clear();
    this.orb.hide();
    this.captureCanvas = null;
    if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);

    this.phase = "idle";
    this.running = false;
    this.onComplete?.();
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.running = false;
    this.unlockInteraction();
    this.showPage();
    this.setOverlayVisible(false);
  }
}

/** @param {string} url */
export function triggerDownload(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop() || "resume.pdf";
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** @type {AnimationController | null} */
let singleton = null;

export function getAnimationController() {
  if (!singleton) singleton = new AnimationController();
  return singleton;
}
