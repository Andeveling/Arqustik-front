export interface UpdateSystemResponseI {
  data: UpdateSystemI
  meta: Meta
}

export interface UpdateSystemI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  update: boolean
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}

export interface Meta {}
