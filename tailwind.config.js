/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'from-orange-300',
        'to-orange-400',
        'from-green-300',
        'to-green-400',
        'from-yellow-300',
        'to-yellow-400',
    ],
}
