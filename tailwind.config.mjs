const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss/types/config').PluginCreator} */
const containerPlugin = ({ addComponents }) =>
  addComponents({
    ".container-fixed": {
      width: "100%",
      maxWidth: "720px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  });

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: defaultTheme.screens.sm,
        md: defaultTheme.screens.md,
      },
    },
    extend: {
      colors: {
        "netural-1": "var(--netural-1)",
        "netural-2": "var(--netural-2)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
        hover: "hsl(var(--border-hover))",
      },
    },
  },
  plugins: [containerPlugin],
};
