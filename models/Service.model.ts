export interface ServicesResponseI {
  data: ServiceI[]
  meta: Meta
}

export interface ServiceI {
  id: number
  attributes: ServiceIAttributes
}

export interface ServiceIAttributes {
  title: string
  price: number
  material: number
  description: string
  UOM: string
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
