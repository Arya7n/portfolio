/**
 * Pooled particle used by ParticleSystem.
 * Fields are mutated in place — never allocate per frame.
 */
export class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.homeX = 0;
    this.homeY = 0;
    this.homeZ = 0;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 1;
    this.size = 1.5;
    this.baseSize = 1.5;
    this.rotation = 0;
    this.spin = 0;
    this.mass = 1;
    this.scatterX = 0;
    this.scatterY = 0;
    this.phaseOffset = 0;
    /** @type {string} */
    this.glyph = "";
    /** 'pixel' | 'symbol' */
    this.kind = "pixel";
  }

  /**
   * @param {object} opts
   */
  init(opts) {
    this.active = true;
    this.x = opts.x;
    this.y = opts.y;
    this.z = opts.z ?? 0;
    this.vx = opts.vx ?? 0;
    this.vy = opts.vy ?? 0;
    this.vz = opts.vz ?? 0;
    this.homeX = opts.homeX ?? opts.x;
    this.homeY = opts.homeY ?? opts.y;
    this.homeZ = opts.homeZ ?? opts.z ?? 0;
    this.r = opts.r;
    this.g = opts.g;
    this.b = opts.b;
    this.a = opts.a ?? 1;
    this.size = opts.size ?? 1.5;
    this.baseSize = this.size;
    this.rotation = opts.rotation ?? 0;
    this.spin = opts.spin ?? 0;
    this.mass = opts.mass ?? 1;
    this.scatterX = opts.scatterX ?? 0;
    this.scatterY = opts.scatterY ?? 0;
    this.phaseOffset = opts.phaseOffset ?? 0;
    this.glyph = opts.glyph ?? "";
    this.kind = opts.kind ?? (this.glyph ? "symbol" : "pixel");
  }
}
