/** Code glyphs used when the page dissolves into source. */
export const CODE_SYMBOLS = [
  "{",
  "}",
  "()",
  "=>",
  "[]",
  ";",
  ":",
  "const",
  "let",
  "async",
  "await",
  "fn",
  "</>",
  "<>",
  "&&",
  "||",
  "===",
  "??",
  "...",
  "::",
  "0x",
  "null",
  "true",
  "false",
  "API",
  "JSON",
  "Node",
  "TS",
  "Redis",
  "{}",
  "->",
  ":=",
  "//",
  "/*",
  "*/",
  "<div>",
  "useState",
  "Promise",
  "export",
  "import",
  "return",
  "await",
  "map()",
  "filter",
  "HTTP",
  "SQL",
  "AWS",
  "Docker",
  "git",
  "npm",
  "||",
  "&&",
  "?.",
  "${}",
  "[]",
  "()",
];

/** Soft syntax-highlight inspired palette (accent-aligned). */
export const SYMBOL_COLORS = [
  [42, 107, 85], // accent green
  [90, 140, 120],
  [160, 200, 180],
  [60, 80, 72],
  [120, 170, 150],
  [200, 220, 210],
  [30, 55, 45],
  [100, 130, 160], // cool keyword hint
  [180, 160, 120], // string-ish warm mute
];

/**
 * @param {number} i
 * @returns {string}
 */
export function pickSymbol(i) {
  return CODE_SYMBOLS[i % CODE_SYMBOLS.length];
}

/**
 * @param {number} i
 * @returns {[number, number, number]}
 */
export function pickSymbolColor(i) {
  return SYMBOL_COLORS[i % SYMBOL_COLORS.length];
}
