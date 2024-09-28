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
            },
            {
                source: '/api/log/:path*',
                destination: 'http://10.180.0.200:8888/api/:path*'
            }
        ]
    }
};

export default nextConfig;
