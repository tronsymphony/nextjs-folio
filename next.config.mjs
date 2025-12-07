/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'casa-dev.com',
                port: '3001',
                pathname: '/api/media/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.18',
                port: '3001',
                pathname: '/api/media/**', // Adjust the path to match your media URL pattern
              },
        ],
    },
};

export default nextConfig;
