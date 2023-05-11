/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        // customKey: 'my-value',
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
    experimental: {
        appDir: true,
        modern: true,
        dynamicImports: true,
    }, 
}

module.exports = nextConfig
