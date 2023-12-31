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
      },
      colors: {
        nav: "green",
        page: "black",
        card: "blue",
        "default-text": "white",
        "default-background": "gray",
        "btn-blue": "rgb(29 78 216 / 1)",
        "btn-passive": "#1f304d"
      }
    },
  },
  plugins: [],
}
export default config
