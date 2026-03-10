/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"], // This ensures subfolders like /host/ and /store/ are scanned
  theme: {
    extend: {},
  },
  plugins: [],
}