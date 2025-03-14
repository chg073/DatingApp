module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        borel: ['Borel', 'cursive'], // Import Borel font globally
        robotoSerif: ['Roboto Serif', 'serif'], // Import Roboto Serif font globally
      },
      colors: {
        customBackground: '#2c3e50', // Replace bg-[#2c3e50] with this
        customButton: '#B76E79', // Replace fill="#B76E79" with this
      },
      spacing: {
        '390px': '390px',
        '844px': '844px',
        '255px': '255px',
        '637px': '637px',
      },
      backgroundImage: {
        'fingers-touch': "url('../assets/images/fingers-touch.jpeg')",
      },
    },
  },
  plugins: [],
};