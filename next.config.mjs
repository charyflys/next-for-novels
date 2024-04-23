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
    },
    rewrites:async () => {
        return [
            {
                source: '/novel/:novelId/:articleId',
                destination: '/articleview'
            },
            {
                source: '/novel/:novelId',
                destination: '/novelView'
            }
        ]
    }
};

export default nextConfig;
