export interface AdminCostResponseI {
  data: AdminCostI[]
  meta: Meta
}

export interface AdminCostI {
  id: number
  attributes: AdminCostIAttributesI
}

export interface AdminCostIAttributesI {
  title: string
  value: number
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
