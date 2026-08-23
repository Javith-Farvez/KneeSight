/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    // Landing page dynamic opacity classes (cn() string construction)
    'bg-teal-500/4', 'bg-teal-500/5', 'bg-teal-500/8', 'bg-teal-500/10',
    'bg-coral-500/4', 'bg-coral-500/5', 'bg-coral-500/8',
    'bg-white/3', 'bg-white/8', 'bg-white/10',
    'border-teal-500/15', 'border-teal-500/20', 'border-teal-500/25', 'border-teal-500/30', 'border-teal-500/40',
    'border-coral-500/20', 'border-coral-500/25', 'border-coral-500/30',
    'border-white/8', 'border-white/10', 'border-white/12', 'border-white/15', 'border-white/25',
    'hover:border-teal-500/40', 'hover:border-white/25', 'hover:border-navy-500/40',
    'shadow-teal-glow', 'shadow-coral-glow',
  ],

  theme: {
    extend: {
      colors: {
        /* ── KneeSight AI Design System Palette ── */
        navy: {
          50:  '#E8EBF2',
          100: '#C6CDE0',
          200: '#9AAAC8',
          300: '#6D87B0',
          400: '#4A6A99',
          500: '#2B4F82',
          600: '#1A3567',
          700: '#0F2150',
          800: '#0B132B',  /* Primary Navy */
          900: '#070D1E',
          950: '#040810',
        },
        teal: {
          50:  '#E6FAF8',
          100: '#BEF3EF',
          200: '#8DECE6',
          300: '#5CE4DA',
          400: '#3BD5CB',
          500: '#2EC4B6',  /* Medical Teal */
          600: '#25A99C',
          700: '#1A8A80',
          800: '#126B65',
          900: '#094D49',
          950: '#04302D',
        },
        coral: {
          50:  '#FFF1F0',
          100: '#FFE0DC',
          200: '#FFC0B9',
          300: '#FF9E95',
          400: '#FF8175',
          500: '#FF6B5E',  /* Controlled Coral */
          600: '#E8503F',
          700: '#C73527',
          800: '#9E1E12',
          900: '#720E07',
          950: '#470500',
        },
        surface: {
          light: '#F7F9FC',   /* Light Background */
          white: '#FFFFFF',
          dark:  '#090F20',   /* Dark Background */
          'dark-2': '#0D1526',
          'dark-3': '#111E35',
          'dark-4': '#162444',
        },
        border: {
          light: '#E4E9F2',
          DEFAULT: '#D0D8E8',
          dark:   '#1E2D4A',
          'dark-2': '#243355',
        },
        text: {
          primary:   '#0B132B',
          secondary: '#4A5A7A',
          tertiary:  '#7A8DAD',
          muted:     '#A0AFCC',
          inverse:   '#FFFFFF',
          'dark-primary': '#EDF1F8',
          'dark-secondary': '#8FA3C5',
          'dark-tertiary': '#5A7099',
          'dark-muted': '#3A5070',
        },
      },

      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', '"Fira Code"', 'monospace'],
      },

      fontSize: {
        /* Type scale – optimized clinical density */
        'ds-h1': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'ds-h2': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.018em', fontWeight: '700' }],
        'ds-h3': ['clamp(1.25rem, 2.5vw, 1.625rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        'ds-h4': ['clamp(1.125rem, 2vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'ds-h5': ['1rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
        'ds-h6': ['0.9375rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
        'ds-body': ['0.875rem', { lineHeight: '1.55' }],
        'ds-small': ['0.8125rem', { lineHeight: '1.5' }],
        'ds-caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'ds-label': ['0.6875rem', { lineHeight: '1.35', letterSpacing: '0.06em', fontWeight: '600' }],
      },

      spacing: {
        /* 8-point grid tokens */
        'micro': '0.25rem',   /* 4px  */
        'xs':    '0.5rem',    /* 8px  */
        'sm':    '1rem',      /* 16px */
        'md':    '1.5rem',    /* 24px */
        'lg':    '2rem',      /* 32px */
        'xl':    '3rem',      /* 48px */
        '2xl':   '4rem',      /* 64px */
        'section': '5rem',    /* 80px */
        'major': '6rem',      /* 96px */
      },

      borderRadius: {
        /* Design system tokens */
        'input':  '8px',
        'btn':    '12px',
        'card':   '16px',
        'panel':  '20px',
        'hero':   '24px',
        'pill':   '999px',
      },

      boxShadow: {
        'e1':    '0 2px 8px rgba(11,19,43,0.06)',
        'e2':    '0 8px 24px rgba(11,19,43,0.10)',
        'e3':    '0 20px 50px rgba(11,19,43,0.18)',
        'e1-dark': '0 2px 8px rgba(0,0,0,0.20)',
        'e2-dark': '0 8px 24px rgba(0,0,0,0.35)',
        'e3-dark': '0 20px 50px rgba(0,0,0,0.50)',
        'teal-glow': '0 0 24px rgba(46,196,182,0.20)',
        'coral-glow': '0 0 24px rgba(255,107,94,0.25)',
        'inner-teal': 'inset 0 1px 0 rgba(46,196,182,0.15)',
        'focus-teal': '0 0 0 3px rgba(46,196,182,0.22)',
        'focus-coral': '0 0 0 3px rgba(255,107,94,0.22)',
      },

      transitionTimingFunction: {
        'ds': 'cubic-bezier(.2,.8,.2,1)',
      },

      transitionDuration: {
        'interaction': '180ms',
        'panel':       '240ms',
        'modal':       '220ms',
        'page':        '320ms',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'skeleton-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'progress-indeterminate': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
      },
      animation: {
        'fade-in':   'fade-in 180ms cubic-bezier(.2,.8,.2,1)',
        'slide-up':  'slide-up 240ms cubic-bezier(.2,.8,.2,1)',
        'slide-down':'slide-down 240ms cubic-bezier(.2,.8,.2,1)',
        'skeleton':  'skeleton-pulse 1.6s ease-in-out infinite',
        'progress-indeterminate': 'progress-indeterminate 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
