/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: '/ergebnisse/live',
        destination: 'https://pfingstsportfest.de/ergebnisse',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
