// Inside /public/tailwind.config.js

module.exports = {
  content: [
    // This is the crucial line
    './**/*.{html,js}',
    // It ensures Tailwind scans every HTML and JS file inside the /public folder and its subdirectories.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
