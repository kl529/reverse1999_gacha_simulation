import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-8px)" },
          "40%, 80%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        shake: "shake 0.6s ease-in-out",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, theme }) {
      const screens = theme("screens") as Record<string, string>;

      // sm-only: 640px ~ 767px
      addVariant(
        "sm-only",
        `@media (min-width: ${screens.sm}) and (max-width: ${
          parseInt(screens.md.replace("px", "")) - 1
        }px)`,
      );

      // md-only: 768px ~ 1023px
      addVariant(
        "md-only",
        `@media (min-width: ${screens.md}) and (max-width: ${
          parseInt(screens.lg.replace("px", "")) - 1
        }px)`,
      );

      // lg-only: 1024px ~ 1279px
      addVariant(
        "lg-only",
        `@media (min-width: ${screens.lg}) and (max-width: ${
          parseInt(screens.xl.replace("px", "")) - 1
        }px)`,
      );
    }),
  ],
};

export default config;
