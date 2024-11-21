/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tnl: {"max": "768px"},
        pdl: {"max": "426px"},
        pdn: {"max": "421px"},
        ttl: {"max": "376px"},
        tdn: {"max": "321px"},
        gedhe: {"min": "769px"},
      },
    },
  },
  plugins: [],
}

