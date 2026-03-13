import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pan-African palette aligned with WHAASCO logo
        primary: {
          // Green (logo stripe – land and natural wealth)
          50: "#e8f5ec",
          100: "#c6e7d1",
          200: "#9fd4b0",
          300: "#6fbd8a",
          400: "#00843d", // Logo green
          500: "#00843d",
          600: "#006b31",
          700: "#005328",
          800: "#003d1e",
          900: "#002614",
        },
        african: {
          // Red (logo stripe – blood of ancestors)
          red: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#ce1126", // Logo red
            500: "#ce1126",
            600: "#a80e1e",
            700: "#820b17",
            800: "#5c0810",
            900: "#36050a",
          },
          // Black (logo stripe and text)
          black: {
            50: "#f5f5f5",
            100: "#e0e0e0",
            200: "#bdbdbd",
            300: "#9e9e9e",
            400: "#757575",
            500: "#616161",
            600: "#424242",
            700: "#303030",
            800: "#212121",
            900: "#000000", // Logo black
          },
          // Gold (logo border – golden-yellow frame)
          gold: {
            50: "#fdf8e8",
            100: "#f9ecc2",
            200: "#f5e099",
            300: "#edd46b",
            400: "#e5c84d",
            500: "#d4af37", // Logo gold border
            600: "#b8962e",
            700: "#967825",
            800: "#745a1c",
            900: "#523d14",
          },
          green: {
            50: "#e8f5ec",
            100: "#c6e7d1",
            200: "#9fd4b0",
            300: "#6fbd8a",
            400: "#00843d",
            500: "#00843d",
            600: "#006b31",
            700: "#005328",
            800: "#003d1e",
            900: "#002614",
          },
        },
      },
      backgroundImage: {
        "african-gradient":
          "linear-gradient(135deg, #005328 0%, #002614 100%)",
        "african-gradient-vertical":
          "linear-gradient(180deg, #005328 0%, #002614 100%)",
        "logo-gold-border":
          "linear-gradient(90deg, #d4af37 0%, #e5c84d 50%, #d4af37 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
