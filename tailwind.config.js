/** @type {import('tailwindcss').Config} */
/*
  AeroIndex — design tokens
  ------------------------------------------------------------
  Navy + Saffron government-grade palette.
  `slate` is re-tinted to a cool navy scale and `blue` is remapped to the
  brand royal-blue, so every existing utility class (bg-slate-900,
  text-blue-600, border-slate-200 …) picks up the new theme automatically.
*/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cool navy-tinted neutrals (used for sidebar, text, borders, surfaces)
        slate: {
          50:  '#F6F8FC',
          100: '#EEF2F8',
          200: '#DFE5EF',
          300: '#C6D0E0',
          400: '#94A3BC',
          500: '#66748F',
          600: '#495671',
          700: '#344058',
          800: '#1C2A45',
          900: '#0F1C38',
          950: '#091328',
        },
        // Brand royal blue (primary actions, links, chart primary series)
        blue: {
          50:  '#EEF4FF',
          100: '#DCE8FF',
          200: '#BCD2FF',
          300: '#8EB2FF',
          400: '#5C8BF5',
          500: '#3768E0',
          600: '#1F4FBF',
          700: '#173D96',
          800: '#132F73',
          900: '#0F2557',
          950: '#0A1838',
        },
        // Saffron accent (highlights, active states, secondary chart series)
        saffron: {
          50:  '#FFF6EA',
          100: '#FFE8CC',
          200: '#FFD199',
          300: '#FDB868',
          400: '#FBA54A',
          500: '#F58A1F',
          600: '#E0730B',
          700: '#B85A08',
        },
        brand: {
          50:  '#EEF4FF',
          100: '#DCE8FF',
          500: '#3768E0',
          600: '#1F4FBF',
          700: '#173D96',
          900: '#0F2557',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card:      '0 1px 2px 0 rgba(15,28,56,.06), 0 1px 3px 0 rgba(15,28,56,.05)',
        'card-md': '0 4px 8px -2px rgba(15,28,56,.08), 0 2px 4px -2px rgba(15,28,56,.05)',
        'card-lg': '0 12px 24px -6px rgba(15,28,56,.14), 0 4px 8px -4px rgba(15,28,56,.06)',
      },
    },
  },
  plugins: [],
}
