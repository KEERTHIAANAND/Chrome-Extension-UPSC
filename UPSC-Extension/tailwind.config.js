/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a3a6b',
                    dark: '#0f2444',
                    light: '#2d5aa0',
                },
                accent: {
                    orange: '#ff6b00',
                    'orange-light': '#ff8533',
                    saffron: '#ff9933',
                    green: '#138808',
                    'green-light': '#1db954',
                },
            },
            fontFamily: {
                display: ['Outfit', 'Inter', 'sans-serif'],
                primary: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 20px rgba(26, 58, 107, 0.08)',
            },
        },
    },
    plugins: [],
}
