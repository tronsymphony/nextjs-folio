/** @type {import('next').NextConfig} */
const nextConfig = {
    // Keep `output: 'export'` off: static export drops redirects() and the
    // /api/lead route handler that every lead form posts to.
    trailingSlash: true,
    async redirects() {
        // Sources are written without a trailing slash; Next matches both forms.
        return [
            { source: '/services/industrial-logistics', destination: '/netsuite/material-handling/', permanent: true },
            { source: '/portfolio', destination: '/work/', permanent: true },
            { source: '/safepath', destination: '/work/safe-streets-map-crash-data-platform/', permanent: true },
        ];
    },
};

export default nextConfig;
