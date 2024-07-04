import type { Config } from "tailwindcss";

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const range = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    spacing: {
      ...range(1, 101).reduce<Record<string, string>>((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    fontSize: {
      ...range(12, 60).reduce<Record<string, string>>((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "var-black": "#1B1B1B",
        "var-primary": "#333236",
        "var-gray1": "#4B4B4B",
        "var-gray2": "#79747E",
        "var-gray3": "#A4A1AA",
        "var-gray4": "#ADAEB8",
        "var-gray5": "#CBC9CF",
        "var-gray6": "#DDDDDD",
        "var-gray7": "#EEEEEE",
        "var-gray8": "#FAFAFA",
        "var-green": "#00AC07",
        "var-green-dark": "#0B3B2D",
        "var-green-light": "#F1EFFD",
        "var-red-dark": "#FF472E",
        "var-red-light": "#FFE4E0",
        "var-orange-dark": "#FF7C1D",
        "var-orange": "#FFF4E8",
        "var-yellow": "#FFC23D",
        "var-blue": "#0085FF",
        "var-blue-dark": "#2EB4FF",
        "var-blue-light": "#E5F3FF",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
