import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
 ],

 theme: {
  extend: {
   fontFamily: {
    sans: ["Poppins", "system-ui"],
   },
   keyframes: {
    bounceUp: {
     "0%": { transform: "translateY(0)" },
     "100%": { transform: "translateY(-20px)" },
    },
   },
   screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    hero: "955px",
    "2xl": "1536px",
    m1: { max: "767px" },
    m2: { max: "1160px" },
    m3: { max: "768px" },
    m4: { max: "955px" },
   },
   colors: {
    "gray-text": "#676B5F",
    "gray-color": "#fff0",
    // "gray-border":"#f7f6f5",
    "gray-background": "#f6f7f5",
    "gray-sand": "#e0e2d9",
    "dashboard-green":"#287774",
    "pebble": "#a8aaa2",
    "test-purple": "purple",
    "button-border": "4rem",
   },
   flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    inherit: "inherit",
    none: "none",
    2: "2 2 0%",
    3: "3 3 0%",
   },
   fontSize: {
    clamp1: `clamp(1.5rem, 0.864rem + 3.18vw, 3.25rem)`,
    clamp2: `clamp(1.7rem, 1.227rem + 2.36vw, 3rem)`,
    clamp3: `clamp(1rem, 0.818rem + 0.91vw, 1.5rem)`,
    clamp4: `clamp(1.438rem, 0.824rem + 3.07vw, 3.125rem)`,
    clamp5: `clamp(3rem, 2.78rem + 1.1vw, 3.604rem)`,
   },
   width: {
    w1: "min(90%, 830px);",
   },
  },
 },
 darkMode: "class",
 plugins: [nextui()],
};
