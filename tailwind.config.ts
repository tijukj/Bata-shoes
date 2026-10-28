import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forme: {
          bg: "#FAF9F6", // Warm ivory white
          card: "#FFFFFF",
          surface: "#F4F1EA", // Soft stone ivory
          surfaceLight: "#FBF9F5",
          border: "#E7E2D8", // Crisp light stone border
          borderLight: "#EFECE6",
          dark: "#141414", // Deep charcoal near-black
          darkMuted: "#262626",
          textMuted: "#6B665F", // Refined editorial muted charcoal
          accent: "#C5A880", // Muted champagne tan
          accentDark: "#9E825A",
          accentLight: "#EFE6D8",
          black: "#0D0D0D"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Outfit", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Outfit", "Georgia", "serif"],
        sans: ["var(--font-body)", "Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
