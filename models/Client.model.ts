export interface ClientI {
  id: number | string
  fullName: string
  cellphone: string
  address: string
  email: string
}

export interface CreateClientI extends Omit<ClientI, "id"> {}
export interface UpdateClientI extends Omit<ClientI, "id"> {}

export interface ResponseClientsI {
  data: ClientDataI[]
  meta: Meta
}

export interface ClientDataI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  fullName: string
  cellphone: string
  address: string
  email: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
