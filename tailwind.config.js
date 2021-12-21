const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        body: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        heading: ['Nunito', ...defaultTheme.fontFamily.sans],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      colors: {
        light: '#b3efff',
        bright: '#00cfff',
        medium: '#046b99',
        dark: '#1c304a',
        // character classifications
        'pwl-number': '#f1f227', // yellow
        'pwl-uppercase': '#00CFFF', // blue
        'pwl-lowercase': '#4add8c', // green
        'pwl-special': '#ff6347', // red
      },
      boxShadow: {
        light: '4px 4px 8px 0px rgba(0, 0, 0, 0.2)',
        dark: '4px 4px 8px 0px rgba(179, 239, 255, 0.15)',
        'growing-underline': 'inset 0 -2px 0 0 currentColor',
      },
    },
  },
};
