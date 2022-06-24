module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      transparent: "transparent",
      nav: "#131212",
      body: "#202225",
      dark: "#072227",
      black: "#000",
      blue: "#4c6ef5",
      "blue-light": "#4FBDBA",
      cyan: "#AEFEFF",
      white: {
        100: "#FFF",
        200: "#FFFFFFb7",
        300: "#FFFFFF66",
        400: "#FFFFFF4d"
      },
      inputs: {
        bg: "#40444b",
        focus: "#7579e7",
      }
    },
    fontFamily: {
      sans: ["poppins", "sans-serif"],
      serif: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"]
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
