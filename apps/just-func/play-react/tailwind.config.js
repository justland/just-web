module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addComponents }) => {
      const AppLogo = {
        '.App-logo': {
          animation: 'App-logo-spin infinite 20s linear',
          height: '40vmin',
          'pointer-events': 'none'
        },
        '@keyframes App-logo-spin': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        }
      }
      addComponents(AppLogo)
    }
  ],
}
