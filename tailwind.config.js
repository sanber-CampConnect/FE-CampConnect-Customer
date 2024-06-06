/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "-1px 1px 10px rgba(0, 0, 0, 0.1)",
      },
    },
    colors: {
      primary: "#064F3B",
      secondary: "#FE8F25",
      neutral: "#7F7F7F",
    },
    fontSize: {
      s: [
        "10px",
        {
          lineHeight: "12px",
        },
      ],
      sm: [
        "12px",
        {
          lineHeight: "16px",
        },
      ],
      base: [
        "14px",
        {
          lineHeight: "17.5px",
        },
      ],
      md: [
        "16px",
        {
          lineHeight: "17.5px",
        },
      ],
      lg: [
        "20px",
        {
          lineHeight: "28px",
        },
      ],
      xl: [
        "24px",
        {
          lineHeight: "32px",
        },
      ],
      "2xl": [
        "28px",
        {
          lineHeight: "36px",
        },
      ],
    },
  },
  plugins: [],
};
