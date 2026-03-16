import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        bg: {
          900: "#1A1A1A",
          700: "#323232",
          500: "#444444",
          300: "#787878",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#C7C7C7",
        },
        red: {
          DEFAULT: "#FF4343",
          light: "#FF8484",
        },
        green: {
          DEFAULT: "#A2FFB4",
        },
        yellow: {
          DEFAULT: "#FFDD64",
          light: "#FFEA9E",
        },
        accent: {
          blue: "#1A72F5",
        },
      },
      fontSize: {
        h1: ["28px", { lineHeight: "110%", fontWeight: "500" }],
        h2: ["20px", { lineHeight: "120%", fontWeight: "600" }],
        body: ["18px", { lineHeight: "130%", fontWeight: "400" }],
        "body-semibold": ["18px", { lineHeight: "130%", fontWeight: "600" }],
        "body-16": ["16px", { lineHeight: "130%", fontWeight: "400" }],
        "body-12": ["12px", { lineHeight: "130%", fontWeight: "400" }],
        button: ["16px", { lineHeight: "20px", fontWeight: "500" }],
      },
      borderRadius: {
        card: "12px",
        "card-lg": "14px",
        input: "8px",
        score: "20px",
      },
    },
  },
  plugins: [],
} satisfies Config;
