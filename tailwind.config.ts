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
          DEFAULT: "#1A1F3D",
          50: "#E8E9EF",
          100: "#D1D3DF",
          200: "#A3A7BF",
          300: "#757B9F",
          400: "#474F7F",
          500: "#1A1F3D",
          600: "#151931",
          700: "#101325",
          800: "#0A0C18",
          900: "#05060C",
        },
        teal: {
          DEFAULT: "#028090",
          50: "#E6F4F6",
          100: "#CCE9ED",
          200: "#99D3DB",
          300: "#66BDC9",
          400: "#33A7B7",
          500: "#028090",
          600: "#026673",
          700: "#014D56",
          800: "#01333A",
          900: "#001A1D",
        },
        mint: {
          DEFAULT: "#00C9A7",
          50: "#E6FAF5",
          100: "#CCF5EB",
          200: "#99EBD7",
          300: "#66E1C3",
          400: "#33D7AF",
          500: "#00C9A7",
          600: "#00A186",
          700: "#007964",
          800: "#005043",
          900: "#002821",
        },
        ice: {
          DEFAULT: "#E8F4F8",
          50: "#F7FBFC",
          100: "#E8F4F8",
          200: "#D1E9F1",
          300: "#BADEE9",
          400: "#A3D3E2",
          500: "#8CC8DB",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
