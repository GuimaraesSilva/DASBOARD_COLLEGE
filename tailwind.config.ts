import type { Config } from "tailwindcss";

const config: Config = {
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

        primary:"#27458d",
        secondary:"#889dc8",
        tertiary:"#cfddf1",
        quaternary:"#ffffff",
        quinary:"#151b54",
        senary:"#0000ff",
        septenary:"#f1f0ff",
        boys:"#295fb6",
        girls:"#a484bc",
        others:"#fae27c "
      },
    },
  },
  plugins: [],
};
export default config;
