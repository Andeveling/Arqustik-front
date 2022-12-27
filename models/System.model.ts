import { AccessoriesResponseI } from './Accessories.model'
import { AdminCostResponseI } from './AdminCost.model'
import { GlassesResponseI } from './Glass.model'
import { ProfilesResponseI } from './Profile.model'
import { ServicesResponseI } from './Service.model'
import { WindowModelsResponseI } from './WindowModels.model'

export interface SystemResponseI {
  data: SystemI
  meta: Meta
}
export interface SystemsResponseI {
  data: SystemI[]
  meta: Meta
}

export interface SystemI {
  id: number
  attributes: SystemAttributesI
}

export interface SystemAttributesI {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  title: SystemsEnum
  update: boolean
  description: string
  profiles: ProfilesResponseI
  accessories: AccessoriesResponseI
  glasses: GlassesResponseI
  administrative_costs: AdminCostResponseI
  services: ServicesResponseI
  window_models: WindowModelsResponseI
}

export interface Meta {}

export enum SystemsEnum {
  BellaSliding = 'bella-sliding',
}
