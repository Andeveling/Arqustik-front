export interface ServicesResponseI {
  data: ServiceI[]
  meta: Meta
}

export interface ServiceI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  price: number
  material: number
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
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
