const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{css,html,js}"],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')()
  ],
  theme: {
    extend: {
      colors: {
        'green': '#E7F3db',
        'screen': '#FCFBF5',
        'shade': '#F7F7EF'
      },
      fontFamily: {
        mono: [ 'Roboto Mono', ...defaultTheme.fontFamily.sans ],
        sans: [ 'Roboto', ...defaultTheme.fontFamily.sans ]
      },
    }
  }
}
