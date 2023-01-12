import { ClientI } from './Client.model'

export interface InterestedI extends ClientI {}

export interface InterestedsResponseI {
  data: InterestedResponseI[]
  meta: Meta
}

export interface InterestedResponseI {
  id: number
  attributes: InterestedAttributes
}

export interface InterestedAttributes {
  fullName: string
  cellphone: string
  address: string
  email: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  windows: Window[]
}

export interface Window {
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
