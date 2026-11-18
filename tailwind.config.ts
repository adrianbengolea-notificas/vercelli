import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        evhsa: {
          red: "#E22815",
          "red-dark": "#B42112",
          "red-deep": "#A90303",
          green: "#11671B",
          "green-mid": "#487251",
          "green-dark": "#005700",
          ink: "#1A1A1A",
          muted: "#5C5C5C",
          sand: "#F6F4F0",
          line: "#E6E2DA",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "Segoe UI", "system-ui", "sans-serif"],
        display: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -18px rgba(26, 26, 26, 0.35)",
        lift: "0 18px 40px -24px rgba(226, 40, 21, 0.45)",
      },
      borderRadius: {
        evhsa: "1.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
