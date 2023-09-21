/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'https://pokeapi.co/api/v2/pokemon/',
    },
    images: {
        domains: ['raw.githubusercontent.com'],
    },
}

module.exports = nextConfig;
