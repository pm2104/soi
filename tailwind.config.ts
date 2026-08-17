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
        navy: {
          DEFAULT: "#0D1B3E",
          50: "#E8EDF5",
          100: "#D1DBEB",
          200: "#A3B7D7",
          300: "#7593C3",
          400: "#476FAF",
          500: "#13254B",
          600: "#0F1E3C",
          700: "#0B172D",
          800: "#07101E",
          900: "#03090F",
        },
        accent: {
          DEFAULT: "#4CAF50",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
        },
        background: "#F8FAFC",
        "light-gray": "#EEF2F7",
        border: "#E5E7EB",
        text: "#111827",
        "secondary-text": "#6B7280",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(13, 27, 62, 0.08)",
        card: "0 8px 30px rgba(13, 27, 62, 0.12)",
        hover: "0 12px 40px rgba(13, 27, 62, 0.16)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;