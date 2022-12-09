export interface GlassResponseI {
  data: GlassI
  meta: Meta
}

export interface GlassesResponseI {
  data: GlassI[]
  meta: Meta
}

export interface GlassI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  id_arqustik: string
  title: string
  price: number
  caliber: number
}

export interface Meta {}
