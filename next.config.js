/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SHOWROOM_API_URL: 'https://laravel.rapidmotors.tech/api',
        NEXT_PUBLIC_SHOWROOM_API_URL_V2: "https://benz_dev.rapidauto.tech/api",
        NEXT_PUBLIC_GOOGLE_RECAPTCHA: '6LfRI1UoAAAAAOKL7AWcsLDmioNDKeUuzdCFjtcX',
    },
    images: {
        domains: ['laravel.rapidmotors.tech'],
    },
}

module.exports = nextConfig;
