/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#121212',
          light: '#1E1E1E'
        },
        primary: {
          DEFAULT: '#FFD700',
          hover: '#F7C600',
          light: '#FFF4B8'
        },
        secondary: {
          DEFAULT: '#333333',
          hover: '#444444',
          light: '#555555'
        },
        success: {
          DEFAULT: '#4CAF50',
          light: '#A5D6A7'
        },
        warning: {
          DEFAULT: '#FFC107',
          light: '#FFE082'
        },
        error: {
          DEFAULT: '#F44336',
          light: '#EF9A9A'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#AAAAAA',
          dark: '#333333'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.2)',
        button: '0 2px 4px rgba(0, 0, 0, 0.1)',
        input: '0 1px 3px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-in-out',
        pulse: 'pulse 1.5s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
};