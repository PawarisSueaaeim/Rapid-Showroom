/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'https://pokeapi.co/api/v2/pokemon/',
        NEXT_PUBLIC_SHOWROOM_API_URL: 'https://laravel.rapidmotors.tech/api',
        NEXT_PUBLIC_GOOGLE_RECAPTCHA: '6LfRI1UoAAAAAOKL7AWcsLDmioNDKeUuzdCFjtcX',
    },
    images: {
        domains: ['raw.githubusercontent.com'],
    },
}

module.exports = nextConfig;
