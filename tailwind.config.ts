/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'sidebar-bg': '#202123',
                'sidebar-hover': '#2A2B32',
                'chat-bg': '#343541',
                'user-message': '#343541',
                'ai-message': '#444654',
                'button-bg': '#343541',
                'button-hover': '#40414F',
            },
        },
    },
    plugins: [],
};
