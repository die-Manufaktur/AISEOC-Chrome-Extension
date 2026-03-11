import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      // Design tokens from Figma go here
      colors: {
        // primary: "#...",
        // secondary: "#...",
      },
      fontFamily: {
        // sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        // Custom spacing scale
      },
      borderRadius: {
        // Custom radii
      },
      boxShadow: {
        // Custom shadows
      },
    },
  },
  plugins: [],
};

export default config;
