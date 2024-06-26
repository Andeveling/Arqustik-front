import type { SWRConfiguration } from 'swr';

const dev = process.env.NODE_ENV !== 'production';

export const arqustikConfig = {
  STRAPI_SERVER: dev ? 'http://localhost:1337/api' : 'https://arqustik-back-production.up.railway.app/api',
  NEXT_SERVER: dev ? 'http://localhost:3000/api' : 'https://arqustikquoter.vercel.app/api',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
  NEXT_AUTH_SECRET: dev ? '12as12sd312dfa123' : process.env.NEXT_AUTH_SECRET,
};

export const endpoints = {
  quotations: '/quotations',
  clients: '/clients',
  windows: '/windows',
  services: '/services',
  systems: '/system-pvcs',
  models: '/window-models',
  administrative_costs: '/administrative-costs',
  window_models: '/window_models',
  interesteds: '/interesteds',
  auth: '/auth/local',
};

export const SWRArqustikConfig: SWRConfiguration = {
  refreshInterval: 60000,
};
