/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SHOWROOM_API_URL: 'https://api.rapidauto.tech/api',
        NEXT_PUBLIC_SHOWROOM_API_URL_V2: "https://benz_dev.rapidauto.tech/api",
        NEXT_PUBLIC_GOOGLE_RECAPTCHA: '6LfRI1UoAAAAAOKL7AWcsLDmioNDKeUuzdCFjtcX',
    },
    images: {
        domains: ['https://api.rapidauto.tech'],
    },
}

module.exports = nextConfig;
