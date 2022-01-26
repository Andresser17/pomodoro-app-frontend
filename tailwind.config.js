module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      first: "#1B2A49",
      second: "#298FFF",
      third: "#F1F1E6",
      fourth: "#FCC642",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      first: "#1B2A49",
      second: "#298FFF",
      third: "#F1F1E6",
      fourth: "#FCC642",
    }),
    stroke: (theme) => ({
      ...theme("colors"),
      first: "#1B2A49",
      second: "#298FFF",
      third: "#F1F1E6",
      fourth: "#FCC642",
    }),
    fill: (theme) => ({
      ...theme("colors"),
      first: "#1B2A49",
      second: "#298FFF",
      third: "#F1F1E6",
      fourth: "#FCC642",
    }),
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
