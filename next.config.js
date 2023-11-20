/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_GOOGLE_RECAPTCHA: "6LfRI1UoAAAAAOKL7AWcsLDmioNDKeUuzdCFjtcX"
    },
    images: {
        domains: ['laravel.rapidmotors.tech'],
    },
}

module.exports = nextConfig;
