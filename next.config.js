/** @type {import('next').NextConfig} */
const nextConfig = {
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
