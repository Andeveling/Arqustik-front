export interface ProfileResponseI {
  data: ProfileI
  meta: Meta
}
export interface ProfilesResponseI {
  data: ProfileI[]
  meta: Meta
}

export interface ProfileI {
  id: number
  attributes: Attributes
}

export interface Attributes {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  title: string
  id_provider: string
  price: number
  type: string
  title_list: string
}

export interface Meta {}
