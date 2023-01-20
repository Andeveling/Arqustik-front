import { ClientI } from './Client.model'

export interface InterestedI extends ClientI {}

export interface InterestedsResponseI {
  data: InterestedI[]
  meta: Meta
}

export interface InterestedI {
  id: number
  attributes: InterestedAttributes
}
export interface InterestedResponseI {
  data: InterestedI
  meta: Meta
}

export interface InterestedAttributes {
  fullName: string
  cellphone: string
  address: string
  email: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  windows: InterestedWindowI[]
}

export interface InterestedWindowI {
  id: string
  title: string
  cost: number
  profit: number
  price: number
  glass: string
  cant: number
  width: number
  height: number
  model: string
  color: string
  description: string
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
