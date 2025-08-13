/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'leaf-fall': 'leafFall 12s linear infinite',
        'leaf-sway': 'leafSway 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'copy-success': 'copySuccess 0.3s ease-in-out',
      },
      keyframes: {
        leafFall: {
          '0%': {
            transform: 'translateY(-100px) translateX(0px) rotate(0deg)',
            opacity: '0.8',
          },
          '25%': {
            transform: 'translateY(25vh) translateX(15px) rotate(90deg)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateY(50vh) translateX(-10px) rotate(180deg)',
            opacity: '0.4',
          },
          '75%': {
            transform: 'translateY(75vh) translateX(20px) rotate(270deg)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-5px) rotate(360deg)',
            opacity: '0',
          },
        },
        leafSway: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) rotate(5deg)' },
          '50%': { transform: 'translateX(-5px) rotate(-3deg)' },
          '75%': { transform: 'translateX(8px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)',
            transform: 'scale(1)',
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
            transform: 'scale(1.05)',
          },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        copySuccess: {
          '0%': { transform: 'scale(1)', backgroundColor: 'rgb(34, 197, 94)' },
          '50%': { transform: 'scale(1.1)', backgroundColor: 'rgb(22, 163, 74)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'rgb(34, 197, 94)' },
        },
      },
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#0a2e1a',
        },
        earth: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        // Sinco brand colors - vibrant and social media friendly
        sinco: {
          primary: '#22c55e',    // Vibrant green for main elements
          secondary: '#059669',   // Deeper green for accents
          accent: '#10b981',     // Medium green for highlights
          light: '#86efac',      // Light green for backgrounds
          dark: '#14532d',       // Dark forest green
          cream: '#f0fdf4',      // Light cream for text/backgrounds
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #0a2e1a 0%, #14532d 25%, #166534 50%, #15803d 75%, #16a34a 100%)',
        'leaf-pattern': 'radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.1) 1px, transparent 0)',
      },
      backgroundSize: {
        'leaf-pattern': '20px 20px',
      }
    },
  },
  plugins: [],
}