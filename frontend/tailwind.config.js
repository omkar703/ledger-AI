/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#0038b6",
        "on-error-container": "#93000a",
        "primary-fixed": "#dde1ff",
        "primary-fixed-dim": "#b7c4ff",
        "tertiary-container": "#bf3003",
        "surface": "#f9f9fb",
        "tertiary-fixed-dim": "#ffb4a1",
        "inverse-primary": "#b7c4ff",
        "outline-variant": "#c3c5d9",
        "surface-container-low": "#f3f3f5",
        "on-secondary-fixed-variant": "#474746",
        "surface-container-highest": "#e2e2e4",
        "tertiary": "#952200",
        "on-error": "#ffffff",
        "surface-variant": "#e2e2e4",
        "border-subtle": "#E5E5E5",
        "surface-dim": "#d9dadc",
        "text-secondary": "#636366",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#ffddd5",
        "primary": "#003ec7",
        "surface-tint": "#004ced",
        "on-secondary-fixed": "#1c1b1b",
        "on-secondary": "#ffffff",
        "text-primary": "#1A1A1A",
        "surface-container": "#eeeef0",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed-variant": "#891e00",
        "on-secondary-container": "#636262",
        "inverse-on-surface": "#f0f0f2",
        "surface-soft": "#FAFAFA",
        "border-strong": "#D1D1D1",
        "on-primary-fixed": "#001452",
        "tertiary-fixed": "#ffdbd2",
        "on-primary-container": "#dfe3ff",
        "outline": "#737688",
        "secondary": "#5f5e5e",
        "surface-base": "#FFFFFF",
        "error": "#ba1a1a",
        "secondary-container": "#e2dfde",
        "inverse-surface": "#2f3132",
        "on-primary": "#ffffff",
        "on-tertiary-fixed": "#3c0800",
        "surface-muted": "#F4F4F4",
        "surface-container-high": "#e8e8ea",
        "on-surface-variant": "#434656",
        "surface-bright": "#f9f9fb",
        "on-background": "#1a1c1d",
        "secondary-fixed-dim": "#c8c6c5",
        "primary-container": "#0052ff",
        "on-surface": "#1a1c1d",
        "background": "#f9f9fb",
        "secondary-fixed": "#e5e2e1"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "margin-mobile": "16px",
        "gutter": "24px",
        "margin-desktop": "48px",
        "container-max": "1280px",
        "unit": "4px"
      },
      fontFamily: {
        "title-md": ["Inter"],
        "body-sm": ["Inter"],
        "display-lg": ["Inter"],
        "label-mono": ["JetBrains Mono"],
        "body-md": ["Inter"],
        "headline-lg": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "button": ["Inter"]
      },
      fontSize: {
        "title-md": ["18px", { lineHeight: "28px", fontWeight: "500" }],
        "body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-mono": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "button": ["14px", { lineHeight: "20px", fontWeight: "500" }]
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'waveform': 'waveform 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
