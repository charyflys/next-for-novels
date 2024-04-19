/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'lz.sinaimg.cn',
                port: '',
                pathname: '/large/**',
            },
        ],
    }
};

export default nextConfig;
