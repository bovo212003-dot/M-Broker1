/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Xanh dương lấy từ logo Automation Land
        brand: {
          DEFAULT: "#2E6DB4",
          dark: "#21568F",
          deep: "#16406B",
          mid: "#6FA3DA",
          soft: "#CFE1F5",
          light: "#EAF2FB",
        },
        // Xám thép lấy từ bánh răng trong logo
        steel: {
          DEFAULT: "#16202B",
          700: "#2A3646",
          600: "#3F4C5C",
          500: "#556273",
          400: "#6E7C8C",
          300: "#A8B3C0",
          200: "#D5DCE4",
          100: "#E8ECF1",
          50: "#F4F6F9",
        },
        signal: {
          DEFAULT: "#B8760F",
          bright: "#E09B2D",
          light: "#FBF1DF",
        },
        alert: {
          DEFAULT: "#B5342A",
          light: "#FAEBE9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.75rem", { lineHeight: "1.05rem" }],
      },
      letterSpacing: {
        eyebrow: "0.08em",
        tight: "-0.015em",
        tighter: "-0.03em",
      },
      borderRadius: {
        card: "14px",
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        lift: "0 1px 2px rgba(22,32,43,.04), 0 12px 28px -12px rgba(22,32,43,.18)",
        board: "0 20px 44px -20px rgba(22,64,107,.55)",
      },
      keyframes: {
        "board-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "board-in": "board-in .45s ease-out both",
        "fade-up": "fade-up .5s cubic-bezier(.16,.84,.44,1) both",
        ticker: "ticker 42s linear infinite",
      },
    },
  },
  plugins: [],
};
