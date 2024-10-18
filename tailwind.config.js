const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .8s 1 normal both',
        'type-reverse': 'type 1.8s ease-out 0s infinite alternate-reverse both',
      },
      colors: {
        'tourLightOrange': '#ff8040',
        'tourDarkBlue': '#293847',
        'tourOrange': '#fa4517',
        'tourRed': 'd12630'
      },
      fontFamily: {
        'wa-bold': ['var(--font-wa-bold)'],
        'wa-regular': ['var(--font-wa-regular)'],
        'wa-headline': ['var(--font-wa-headline)'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            th: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.tourLightOrange'),
            },
          },
        },
      })
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography'), flowbite.plugin()],
}
