const dev = process.env.NODE_ENV !== 'production'

export const arqustikConfig = {
  STRAPI_SERVER: dev ? 'http://localhost:1337/api' : 'https://arqustik-back-production.up.railway.app/api',
  NEXT_SERVER: dev ? 'http://localhost:3000/api' : 'https://arqustikquoter.vercel.app/',
}

export const endpoints = {
  quotations: '/quotations',
  clients: '/clients',
  windows: '/windows',
}
