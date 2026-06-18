/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        paper: "#f3eee4",
        mist: "#d7e4ef",
        slate: "#10243d",
        ember: "#f68a4b",
        gold: "#efd790",
        pine: "#0f3b36",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      boxShadow: {
        panel: "0 20px 80px rgba(7, 17, 31, 0.12)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(7, 17, 31, 0.24)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(239, 215, 144, 0.28), transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)",
      },
    },
  },
  plugins: [],
};

