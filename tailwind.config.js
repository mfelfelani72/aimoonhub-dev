const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");





module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      main: [
        'iranSans',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    screens: {

      'xs': '410px',
      // => @media (min-width: 475px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '769px',
      // => @media (min-width: 768px) { ... }

      'bi': '912px',
      // => @media (min-width: 912px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
    pdirection: 'ltr',

    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },

      colors: {
        yellow: '#F0B90A',
        nblue: '#032B44',
        green: '#34C759',
        black: '#000000',
        red: '#E02D2D',
        white: '#fff',

        // { dark mode color

        // text
        'DT-dim': '#334155',
        'DT-bright': '#e2e8f0',
        'DT-title': '#64748b',

        // background
        'DB-dim': '#1d232a',
        'DB-bright': '#64748b',
        'DB-V-bright': '#cbd5e1',

        // shadow
        'DSH-dark': '#64748b',

        'D-color-theme': '#e57c43',
        'D-color-theme-light': '#e57c4336',

        // dark mode color }

        // { light mode color

        //text
        'T-dim': '#0f172a',
        'T-bright': '#475579',
        'T-title': '#e57c4336',

        // background
        'B-dim': '#1d232a',
        'B-bright': '#e2e8f0',
        'B-V-bright': '#fff',

        'color-theme': '#e57c43',
        'color-theme-light': '#e57c4336',

        // light mode color }
      },

      backgroundImage: {
        'navy-to-black': 'linear-gradient(to bottom, #032B44, #000000)',
      },

    },

  },
  variants: {
    extend: {},
  },
  plugins: [addVariablesForColors, require("daisyui"),require("@tailwindcss/forms"),],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
} 