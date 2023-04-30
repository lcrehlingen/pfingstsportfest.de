/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: '/ergebnisse/live',
        destination: 'https://www.leichtathletik.de/termine/wettkampf-kalender/veranstaltung/detail/58-Internationales-Pfingstsportfest-Rehlingen-23V14000008205101',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
