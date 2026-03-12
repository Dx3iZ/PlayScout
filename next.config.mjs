/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.freetogame.com', 'img.icons8.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.freetogame.com'
            }
        ]
    }
}

export default nextConfig
