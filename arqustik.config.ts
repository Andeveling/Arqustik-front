import type { SWRConfiguration } from 'swr'

const dev = process.env.NODE_ENV !== 'production'

export const arqustikConfig = {
  STRAPI_SERVER: dev ? 'http://localhost:1337/api' : 'https://arqustik-back-production.up.railway.app/api',
  NEXT_SERVER: dev ? 'http://localhost:3000/api' : 'https://arqustikquoter.vercel.app/api',
}

export const endpoints = {
  quotations: '/quotations',
  clients: '/clients',
  windows: '/windows',
  services: '/services',
  systems: '/system-pvcs',
  administrative_costs: '/administrative-costs',
  window_models: '/window_models',
}

export const SWRArqustikConfig: SWRConfiguration = {
  refreshInterval: 60000,
}
