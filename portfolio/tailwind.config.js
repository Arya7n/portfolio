/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#121212",
          soft: "#2A2A2A",
          muted: "#6B6B66",
          faint: "#9A9A94",
        },
        paper: {
          DEFAULT: "#F3F3F0",
          soft: "#E8E8E3",
          warm: "#DDDDD6",
        },
        accent: {
          DEFAULT: "#1B4D3E",
          soft: "#2A6B55",
          mist: "#D8E6DF",
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Figtree"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};
