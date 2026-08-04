import { lerp } from "./easing";

/**
 * Soft glowing energy orb with orbiting micro-particles.
 */
export class Orb {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.targetRadius = 28;
    this.alpha = 0;
    this.pulse = 0;
    this.visible = false;
    this.trail = [];
    this.maxTrail = 18;
    this.satellites = [];
    this._initSatellites(14);
  }

  /** @param {number} count */
  _initSatellites(count) {
    this.satellites.length = 0;
    for (let i = 0; i < count; i++) {
      this.satellites.push({
        angle: (Math.PI * 2 * i) / count + Math.random() * 0.4,
        speed: 0.8 + Math.random() * 1.4,
        orbit: 18 + Math.random() * 22,
        size: 1 + Math.random() * 1.6,
        alpha: 0.35 + Math.random() * 0.45,
      });
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  appear(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 0;
    this.visible = true;
    this.trail.length = 0;
  }

  hide() {
    this.visible = false;
    this.alpha = 0;
    this.radius = 0;
    this.trail.length = 0;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {boolean} [recordTrail]
   */
  setPosition(x, y, recordTrail = false) {
    if (recordTrail && this.visible) {
      this.trail.push({ x: this.x, y: this.y, a: this.alpha });
      if (this.trail.length > this.maxTrail) this.trail.shift();
    }
    this.x = x;
    this.y = y;
  }

  /**
   * @param {number} dt seconds
   * @param {number} strength 0–1 merge intensity
   */
  update(dt, strength = 1) {
    if (!this.visible) return;
    this.pulse += dt * 2.4;
    this.radius = lerp(this.radius, this.targetRadius * strength, 1 - Math.exp(-dt * 4.2));
    this.alpha = lerp(this.alpha, 0.95 * strength, 1 - Math.exp(-dt * 3.6));

    for (let i = 0; i < this.satellites.length; i++) {
      this.satellites[i].angle += this.satellites[i].speed * dt * 0.85;
    }

    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].a *= 0.9;
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {{ streak?: boolean, blurAmount?: number }} [opts]
   */
  draw(ctx, opts = {}) {
    if (!this.visible || this.alpha < 0.01) return;

    const { streak = false, blurAmount = 0 } = opts;
    const pulseScale = 1 + Math.sin(this.pulse) * 0.06;
    const r = this.radius * pulseScale;

    // Motion trail
    if (this.trail.length > 1) {
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        const p = i / this.trail.length;
        const tr = r * (0.25 + p * 0.55);
        const ta = t.a * 0.35 * p;
        if (ta < 0.01) continue;
        const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, tr * 2.2);
        g.addColorStop(0, `rgba(120, 200, 170, ${ta * 0.7})`);
        g.addColorStop(0.45, `rgba(40, 90, 70, ${ta * 0.35})`);
        g.addColorStop(1, "rgba(20, 40, 30, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(t.x, t.y, tr * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Soft bloom
    const bloom = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4.5);
    bloom.addColorStop(0, `rgba(180, 230, 205, ${0.22 * this.alpha})`);
    bloom.addColorStop(0.35, `rgba(42, 107, 85, ${0.18 * this.alpha})`);
    bloom.addColorStop(1, "rgba(18, 18, 18, 0)");
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Core
    const core = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
    core.addColorStop(0, `rgba(245, 250, 247, ${this.alpha})`);
    core.addColorStop(0.35, `rgba(160, 210, 185, ${0.9 * this.alpha})`);
    core.addColorStop(0.7, `rgba(42, 107, 85, ${0.75 * this.alpha})`);
    core.addColorStop(1, `rgba(18, 40, 32, ${0.15 * this.alpha})`);
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fill();

    // Streak / motion blur along velocity direction during launch
    if (streak && blurAmount > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.translate(this.x, this.y);
      ctx.rotate(-Math.PI / 4);
      const sg = ctx.createLinearGradient(-r * blurAmount, 0, r * 0.5, 0);
      sg.addColorStop(0, "rgba(120, 200, 170, 0)");
      sg.addColorStop(0.55, `rgba(140, 210, 180, ${0.35 * this.alpha})`);
      sg.addColorStop(1, `rgba(230, 245, 235, ${0.55 * this.alpha})`);
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * blurAmount, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Orbiting satellites
    for (let i = 0; i < this.satellites.length; i++) {
      const s = this.satellites[i];
      const sx = this.x + Math.cos(s.angle) * s.orbit * (0.7 + strengthSafe(this.alpha));
      const sy = this.y + Math.sin(s.angle) * s.orbit * 0.65;
      ctx.fillStyle = `rgba(200, 230, 215, ${s.alpha * this.alpha})`;
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** @param {number} a */
function strengthSafe(a) {
  return Math.max(0.4, a);
}
