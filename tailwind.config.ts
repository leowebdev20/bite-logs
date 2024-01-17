import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/ffflux.svg')",
        'footer-pattern': "url('/wwwatercolor.jpg')",
      },
      colors: {
        nav: "green",
        page: "black",
        card: "blue",
        "default-text": "white",
        "default-background": "gray",
        "btn-blue": "rgb(29 78 216 / 1)",
        "btn-passive": "#1f304d",
        "dark-t": "#652791",
        "medium-t": "#812791",
        "light-t": "#b347ad",
        "green-t": "#65b391",
        "gray-t": "#F1EFF6"
      }
    },
  },
  plugins: [],
}
export default config
