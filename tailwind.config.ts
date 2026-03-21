import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0C1B2A",
          50: "#EFF3F4",
          100: "#D1D8DC",
          200: "#A3B1B9",
          300: "#758A96",
          400: "#2C4356",
          500: "#0C1B2A",
          600: "#0A1622",
          700: "#07111A",
          800: "#050B11",
          900: "#020609",
        },
        slate: {
          DEFAULT: "#1B2D42",
        },
        steel: {
          DEFAULT: "#2C4356",
        },
        teal: {
          DEFAULT: "#1F7A8C",
          50: "#E8F3F5",
          100: "#D1E7EB",
          200: "#A3CFD7",
          300: "#75B7C3",
          400: "#479FAF",
          500: "#1F7A8C",
          600: "#196270",
          700: "#134954",
          800: "#0C3138",
          900: "#06181C",
        },
        sage: {
          DEFAULT: "#48A9A6",
          50: "#EBF5F5",
          100: "#D7EBEA",
          200: "#AFD7D5",
          300: "#87C3C0",
          400: "#5FAFAB",
          500: "#48A9A6",
          600: "#3A8785",
          700: "#2B6564",
          800: "#1D4342",
          900: "#0E2221",
        },
        amber: {
          DEFAULT: "#E8A44A",
          50: "#FDF5E9",
          100: "#FBEBD3",
          200: "#F7D7A7",
          300: "#F3C37B",
          400: "#EFAF4F",
          500: "#E8A44A",
          600: "#BA833B",
          700: "#8B622C",
          800: "#5D421E",
          900: "#2E210F",
        },
        light: {
          DEFAULT: "#EFF3F4",
        },
        // Keep old names as aliases for backwards compatibility during transition
        mint: {
          DEFAULT: "#48A9A6",
          400: "#5FAFAB",
        },
        ice: {
          DEFAULT: "#EFF3F4",
          50: "#F7FAFB",
          100: "#EFF3F4",
          200: "#DFE7E9",
          300: "#CFDBDE",
          400: "#BFCFD3",
          500: "#AFc3C8",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
        sans: ["Helvetica", "Calibri", "Arial", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
