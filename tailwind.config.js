import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**",
  ],

  theme: {
  	colors: {
            ...colors,
  		lgreen: '#96B271',
  		sand: '#D6C67A',
  		brown: '#D2C9C2',
  		darkblue: '#162747',
  		background: 'hsl(var(--background))',
  		foreground: 'hsl(var(--foreground))',
  		card: {
  			DEFAULT: 'hsl(var(--card))',
  			foreground: 'hsl(var(--card-foreground))'
  		},
  		popover: {
  			DEFAULT: 'hsl(var(--popover))',
  			foreground: 'hsl(var(--popover-foreground))'
  		},
  		primary: {
  			DEFAULT: 'hsl(var(--primary))',
  			foreground: 'hsl(var(--primary-foreground))'
  		},
  		secondary: {
  			DEFAULT: 'hsl(var(--secondary))',
  			foreground: 'hsl(var(--secondary-foreground))'
  		},
  		muted: {
  			DEFAULT: 'hsl(var(--muted))',
  			foreground: 'hsl(var(--muted-foreground))'
  		},
  		accent: {
  			DEFAULT: 'hsl(var(--accent))',
  			foreground: 'hsl(var(--accent-foreground))'
  		},
  		destructive: {
  			DEFAULT: 'hsl(var(--destructive))',
  			foreground: 'hsl(var(--destructive-foreground))'
  		},
  		border: 'hsl(var(--border))',
  		input: 'hsl(var(--input))',
  		ring: 'hsl(var(--ring))',
  		chart: {
  			'1': 'hsl(var(--chart-1))',
  			'2': 'hsl(var(--chart-2))',
  			'3': 'hsl(var(--chart-3))',
  			'4': 'hsl(var(--chart-4))',
  			'5': 'hsl(var(--chart-5))'
  		}
  	},
  	extend: {
  		fontFamily: {
  			jakarta: [
  				'Plus Jakarta Sans',
  				'sans-serif'
  			],
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
  			sans: [
  				'Plus Jakarta Sans',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
safelist: [
  "bg-teal-50 border-teal-200",
  "bg-purple-50 border-purple-200",
  "bg-cyan-50 border-cyan-200",
  "bg-indigo-50 border-indigo-200",
  "bg-orange-50 border-orange-200",
  "bg-lime-50 border-lime-200",
  "bg-pink-50 border-pink-200",
  "bg-rose-50 border-rose-200",
  "border-blue-200",
  "border-yellow-200",
  "bg-red-50 border-red-200",
  "bg-green-50 border-green-200",
  "bg-amber-50 border-amber-200",
  "bg-emerald-50 border-emerald-200",
  "bg-sky-50 border-sky-200",
  "bg-orange-100 border-orange-200",
  "bg-lime-100 border-lime-200",
  "bg-pink-100 border-pink-200",
  "bg-yellow-50 border-yellow-200",
  "bg-blue-50 border-blue-200",
  "bg-fuchsia-50 border-fuchsia-200",
  "bg-gray-100 border-gray-200",
  "bg-cyan-100",
  "bg-violet-50 border-violet-200",
  "from-purple-50 to-pink-50",
  "from-red-50 to-orange-50",
],
  plugins: [require("tailwindcss-animate")],
};
