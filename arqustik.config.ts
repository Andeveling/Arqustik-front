const dev = process.env.NODE_ENV !== "production"

export const arqustikConfig = {
  STRAPI_SERVER: dev ? "http://localhost:1337/api" : "https://your_deployment.server.com",
  NEXT_SERVER: dev ? "http://localhost:3000/api" : "https://your_deployment.server.com",
}

export const endpoints = {
  quotations: "/quotations",
  clients: "/clients",
  windows: "/windows",
}
