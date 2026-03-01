/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'g2khenderson.com' }],
        destination: 'https://g2kyourcity.com/henderson',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.g2khenderson.com' }],
        destination: 'https://g2kyourcity.com/henderson',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
