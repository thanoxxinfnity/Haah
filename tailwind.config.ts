import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0b0d12",
        panel: "#12151c",
        line: "#22262f",
        accent: "#6d5bff",
      },
    },
  },
  plugins: [],
};

export default config;
