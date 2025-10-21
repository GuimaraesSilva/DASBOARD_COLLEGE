import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lamaSky: "#C3EBFA",
        lamaSkyLight: "#EDF9FD",
        lamaPurple: "#CFCEFF",
        lamaPurpleLight: "#F1F0FF",
        lamaYellow: "#FAE27C",
        lamaYellowLight: "#FEFCE8",

        primary: "#27458d",
        secondary: "#889dc8",
        tertiary: "#cfddf1",
        quaternary: "#ffffff",
        quinary: "#151b54",
        senary: "#0000ff",
        septenary: "#f1f0ff",
        others: "#fae27c",

        extralightyellow: "#F9F2E6",
        seclightyellow: "#e6dcc5",
        lightyellow: "#D9C392",
        yellow: "#DAA749",
        darkyellow: "#997739",
        extralightgrey: "#F2F4F6",
        lightgrey: "#717F88",
        darkgrey: "#333B41",
        black: "#121417",
        text: "#ffffff",
        boys: "#5A7D65",
        girls: "#9D6B8F",
      },
    },
  },
  plugins: [],
};
export default config;
