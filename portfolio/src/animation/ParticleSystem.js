import { Particle } from "./Particle";
import {
  clamp01,
  damp,
  easeInOutCubic,
  easeOutCubic,
  easeOutQuint,
  lerp,
  smootherstep,
} from "./easing";
import { pickSymbol, pickSymbolColor } from "./symbols";

const MAX_PARTICLES = 9000;

/**
 * Visual mode for the dissolve field.
 * Flip to "pixels" to restore the original color-particle breakup.
 */
export const DISSOLVE_MODE = /** @type {'symbols' | 'pixels'} */ ("pixels");

/**
 * Object-pooled particle / glyph field.
 */
export class ParticleSystem {
  constructor() {
    /** @type {Particle[]} */
    this.pool = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.pool.push(new Particle());
    }
    this.count = 0;
    this.cx = 0;
    this.cy = 0;
    /** @type {'symbols' | 'pixels'} */
    this.mode = DISSOLVE_MODE;
  }

  /**
   * Dense monospace code grid across the viewport.
   * Optionally tints glyphs from a captured frame for subtle page echo.
   * @param {number} viewW
   * @param {number} viewH
   * @param {HTMLCanvasElement | null} [source]
   */
  spawnAsCodeSymbols(viewW, viewH, source = null) {
    this.mode = "symbols";
    this.cx = viewW * 0.5;
    this.cy = viewH * 0.5;
    this.count = 0;

    const isMobile = viewW < 768;
    const cellW = isMobile ? 52 : 44;
    const cellH = isMobile ? 28 : 24;
    const cols = Math.ceil(viewW / cellW) + 1;
    const rows = Math.ceil(viewH / cellH) + 1;

    let imgData = null;
    let sw = 0;
    let sh = 0;
    if (source) {
      const ctx = source.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        sw = source.width;
        sh = source.height;
        imgData = ctx.getImageData(0, 0, sw, sh).data;
      }
    }

    let idx = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (this.count >= MAX_PARTICLES) break;

        const x = col * cellW + cellW * 0.35 + (Math.random() - 0.5) * 6;
        const y = row * cellH + cellH * 0.65 + (Math.random() - 0.5) * 4;
        if (x < -20 || y < -10 || x > viewW + 20 || y > viewH + 20) continue;

        // Thin out empty-feeling regions slightly for elegance
        if (Math.random() > 0.88) continue;

        let r;
        let g;
        let b;
        const [pr, pg, pb] = pickSymbolColor(idx);

        if (imgData && sw && sh) {
          const sx = Math.min(sw - 1, Math.max(0, Math.floor((x / viewW) * sw)));
          const sy = Math.min(sh - 1, Math.max(0, Math.floor((y / viewH) * sh)));
          const pi = (sy * sw + sx) * 4;
          const lum = (imgData[pi] * 0.299 + imgData[pi + 1] * 0.587 + imgData[pi + 2] * 0.114) / 255;
          // Blend page luminance into syntax palette — keeps a ghost of the layout
          r = Math.round(lerp(pr, imgData[pi] * 0.35 + pr * 0.65, 0.55));
          g = Math.round(lerp(pg, imgData[pi + 1] * 0.35 + pg * 0.65, 0.55));
          b = Math.round(lerp(pb, imgData[pi + 2] * 0.35 + pb * 0.65, 0.55));
          // Soften very bright paper zones
          if (lum > 0.9) {
            r = Math.round(r * 0.75);
            g = Math.round(g * 0.85);
            b = Math.round(b * 0.8);
          }
        } else {
          r = pr;
          g = pg;
          b = pb;
        }

        const angle = Math.random() * Math.PI * 2;
        const explode = 28 + Math.random() * 55;
        const glyph = pickSymbol(idx + row * 3);
        const fontSize = (isMobile ? 11 : 12) + (glyph.length > 3 ? 0 : 1) + Math.random() * 2;

        const p = this.pool[this.count++];
        p.init({
          x,
          y,
          z: (Math.random() - 0.5) * 24,
          homeX: x,
          homeY: y,
          homeZ: (Math.random() - 0.5) * 24,
          r,
          g,
          b,
          a: 0,
          size: fontSize,
          rotation: (Math.random() - 0.5) * 0.35,
          spin: (Math.random() - 0.5) * 0.9,
          mass: 0.75 + Math.random() * 0.5,
          scatterX: Math.cos(angle) * explode,
          scatterY: Math.sin(angle) * explode,
          phaseOffset: Math.random(),
          glyph,
          kind: "symbol",
        });
        idx++;
      }
    }
  }

  /**
   * Original color-particle breakup (kept for easy revert).
   * @param {HTMLCanvasElement} source
   * @param {number} viewW
   * @param {number} viewH
   */
  spawnFromImage(source, viewW, viewH) {
    this.mode = "pixels";
    const ctx = source.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      this.count = 0;
      return;
    }

    const sw = source.width;
    const sh = source.height;
    const data = ctx.getImageData(0, 0, sw, sh).data;

    const isMobile = viewW < 768;
    const budget = isMobile ? 4000 : 7500;
    const step = Math.max(3, Math.ceil(Math.sqrt((sw * sh) / budget)));

    this.cx = viewW * 0.5;
    this.cy = viewH * 0.5;
    this.count = 0;

    const scaleX = viewW / sw;
    const scaleY = viewH / sh;

    for (let py = 0; py < sh; py += step) {
      for (let px = 0; px < sw; px += step) {
        if (this.count >= MAX_PARTICLES) break;

        const i = (py * sw + px) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255;
        if (a < 0.12) continue;
        const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        if (lum > 0.92 && Math.random() > 0.5) continue;

        const x = px * scaleX + (Math.random() - 0.5) * step * scaleX * 0.35;
        const y = py * scaleY + (Math.random() - 0.5) * step * scaleY * 0.35;
        const z = (Math.random() - 0.5) * 28;
        const angle = Math.random() * Math.PI * 2;
        const explode = 22 + Math.random() * 48;

        const p = this.pool[this.count++];
        p.init({
          x,
          y,
          z,
          homeX: x,
          homeY: y,
          homeZ: z,
          r,
          g,
          b,
          a: 0,
          size: (step * Math.min(scaleX, scaleY)) * (0.6 + Math.random() * 0.45),
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 1.4,
          mass: 0.75 + Math.random() * 0.5,
          scatterX: Math.cos(angle) * explode,
          scatterY: Math.sin(angle) * explode,
          phaseOffset: Math.random(),
          kind: "pixel",
        });
      }
    }
  }

  clear() {
    for (let i = 0; i < this.count; i++) {
      this.pool[i].active = false;
    }
    this.count = 0;
  }

  /**
   * Soft outward breath, then elegant spiral pull to center.
   * @param {number} progress 0–1
   * @param {number} dt
   */
  updateCollapse(progress, dt) {
    const p = smootherstep(clamp01(progress));
    const materialize = smootherstep(clamp01(progress / 0.22));
    const explodeT = smootherstep(clamp01(p / 0.22));
    const pullT = smootherstep(clamp01((p - 0.14) / 0.86));

    for (let i = 0; i < this.count; i++) {
      const particle = this.pool[i];
      if (!particle.active) continue;

      const stagger = particle.phaseOffset * 0.12;
      const localPull = smootherstep(clamp01((pullT - stagger) / (1 - stagger)));

      const scatterX = particle.homeX + particle.scatterX * 0.42;
      const scatterY = particle.homeY + particle.scatterY * 0.42;
      const fromX = lerp(particle.homeX, scatterX, explodeT);
      const fromY = lerp(particle.homeY, scatterY, explodeT);

      const dx = this.cx - fromX;
      const dy = this.cy - fromY;
      const dist = Math.hypot(dx, dy) || 1;
      const swirl = (1 - localPull) * 0.55 + particle.phaseOffset * 0.25;
      const angle = Math.atan2(dy, dx) + swirl;

      const orbit = dist * (1 - localPull) * 0.22;
      const targetX = lerp(fromX, this.cx + Math.cos(angle) * orbit, localPull);
      const targetY = lerp(fromY, this.cy + Math.sin(angle) * orbit, localPull);
      const targetZ = lerp(particle.homeZ, 0, localPull);

      const follow = 3.2 + localPull * 7;
      particle.x = damp(particle.x, targetX, dt, follow);
      particle.y = damp(particle.y, targetY, dt, follow);
      particle.z = damp(particle.z, targetZ, dt, 4);

      particle.rotation += particle.spin * dt * (0.6 + localPull * 1.2);

      const targetA =
        this.mode === "symbols"
          ? lerp(0, 0.92, materialize) * (1 - localPull * 0.55)
          : materialize * (0.25 + (1 - localPull) * 0.75);
      particle.a = damp(particle.a, targetA, dt, 5);

      const sizeTarget =
        this.mode === "symbols"
          ? particle.baseSize * (1 - localPull * 0.35)
          : Math.max(0.6, particle.baseSize * (1 - localPull * 0.55));
      particle.size = damp(particle.size, sizeTarget, dt, 3.5);
    }
  }

  /**
   * @param {number} progress 0–1
   * @param {number} dt
   */
  updateMerge(progress, dt) {
    const p = easeInOutCubic(clamp01(progress));
    for (let i = 0; i < this.count; i++) {
      const particle = this.pool[i];
      if (!particle.active) continue;

      const stagger = particle.phaseOffset * 0.2;
      const local = smootherstep(clamp01((p - stagger) / Math.max(0.001, 1 - stagger)));

      particle.x = damp(particle.x, this.cx, dt, 6 + local * 12);
      particle.y = damp(particle.y, this.cy, dt, 6 + local * 12);
      particle.z = damp(particle.z, 0, dt, 7);
      particle.a = damp(particle.a, 0, dt, 4 + local * 8);
      particle.size = damp(particle.size, this.mode === "symbols" ? 6 : 0.2, dt, 5);
      particle.rotation += particle.spin * dt * (1.2 + local);
    }
  }

  /**
   * @param {number} progress 0–1
   * @param {number} dt
   */
  updateReform(progress, dt) {
    const p = easeOutQuint(clamp01(progress));
    for (let i = 0; i < this.count; i++) {
      const particle = this.pool[i];
      if (!particle.active) continue;

      const delay = particle.phaseOffset * 0.28;
      const local = clamp01((p - delay) / Math.max(0.001, 1 - delay));
      const e = easeOutCubic(local);

      particle.x = lerp(this.cx, particle.homeX, e);
      particle.y = lerp(this.cy, particle.homeY, e);
      particle.z = lerp(0, particle.homeZ, e);
      particle.a = lerp(0, this.mode === "symbols" ? 0.85 : 1, clamp01(local * 1.35));
      particle.size = lerp(
        this.mode === "symbols" ? 7 : 0.3,
        particle.baseSize,
        e
      );
      particle.rotation = damp(particle.rotation, 0, dt, 3);
    }
  }

  settleHome() {
    for (let i = 0; i < this.count; i++) {
      const particle = this.pool[i];
      particle.x = particle.homeX;
      particle.y = particle.homeY;
      particle.z = particle.homeZ;
      particle.size = particle.baseSize;
      particle.a = this.mode === "symbols" ? 0 : 1;
      particle.rotation = 0;
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} [depthFade]
   * @param {number} [alphaMul]
   */
  draw(ctx, depthFade = 1, alphaMul = 1) {
    if (this.mode === "symbols") {
      this.drawSymbols(ctx, depthFade, alphaMul);
      return;
    }

    for (let i = 0; i < this.count; i++) {
      const p = this.pool[i];
      if (!p.active || p.a < 0.02) continue;

      const depth = 1 + (p.z / 80) * 0.25 * depthFade;
      const size = Math.max(0.4, p.size * depth);
      const alpha = Math.min(1, p.a * (0.85 + depth * 0.15) * alphaMul);
      if (alpha < 0.02) continue;

      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * 0.15);
      ctx.fillRect(-size * 0.5, -size * 0.5, size, size);
      ctx.restore();
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} depthFade
   * @param {number} alphaMul
   */
  drawSymbols(ctx, depthFade, alphaMul = 1) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < this.count; i++) {
      const p = this.pool[i];
      if (!p.active || p.a < 0.02) continue;

      const depth = 1 + (p.z / 90) * 0.2 * depthFade;
      const alpha = Math.min(1, p.a * (0.8 + depth * 0.2) * alphaMul);
      if (alpha < 0.02) continue;
      const size = Math.max(8, p.size * depth);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
      ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
}
