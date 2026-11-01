/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '')
    if (!apiBaseUrl) return []

    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${apiBaseUrl}/api/:path*`,
        },
      ],
    }
  },
}

export default nextConfig
