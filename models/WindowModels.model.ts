import { WindowModelsEnum } from './WindowPVC.model'

export interface WindowModelsResponseI {
  data: WindowsModelResponseI[]
  meta: Meta
}

export interface WindowsModelResponseI {
  id: number
  attributes: WindowsModelAttributesI
}

export interface WindowsModelAttributesI {
  title: string
  type: WindowType
  opening: WindowModelsEnum
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  windowdoor: WindowDoor
  model3D: string
  hours: number
  minW: number
  maxW: number
  minH: number
  maxH: number
}

export enum WindowType {
  Sliding = 'sliding',
}

export enum WindowDoor {
  Door = 'door',
  Window = 'window',
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
