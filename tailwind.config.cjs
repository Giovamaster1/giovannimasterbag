/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titulo: ['Montserrat', 'sans-serif'],         // Para títulos y headers
        texto: ['Roboto', 'sans-serif'],              // Para textos generales
        tecnico: ['Roboto Condensed', 'sans-serif'],  // Para fichas técnicas o legales
      },
      colors: {
        rojo: '#E30000',        // Rojo Masterbag
        negro: '#000000',       // Negro técnico
        gris: '#B5B5B5',        // Gris soporte técnico
        blanco: '#FFFFFF',      // Blanco puro
      },
    },
  },
  plugins: [],
}
