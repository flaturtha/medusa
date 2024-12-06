export default {
  plugins: {
    tailwindcss: {
      config: "tailwind.config.js",
    },
    autoprefixer: {},
    "postcss-modules": {}, // Handles CSS Modules
    "postcss-discard-duplicates": {}, // Removes duplicate CSS rules
  },
};

