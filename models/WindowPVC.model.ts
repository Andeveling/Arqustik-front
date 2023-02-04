import { ProjectDataProps } from '@components/WindowsPVC/WindowsPVCForm'
import { GlassResponseI } from './Glass.model'
import { QuotationI } from './Quotation.model'
import { SystemsEnum } from './System.model'

export interface WindowI {
  id: number | string
  price: number

  title: string
  system: SystemsEnum
  model: WindowModelsEnum
  description: string
  location?: string
  width: number
  height: number
  glass: string
  type: WindowTypeEnum
  color: string
  cant: number
}

export enum WindowTypeEnum {
  WINDOW = 'window',
  DOOR = 'door',
}

export enum WindowModelsEnum {
  XO = 'XO',
  OX = 'OX',
  XX = 'XX',
  OXXO = 'OXXO',
  XXO = 'XXO',
  OXX = 'OXX',
  XXX = 'XXX',
  '[>]' = '[>]',
  '[<]' = '[<]',
  '[O]' = '[O]',
  // TODO: añadir modelos
  '[V]' = '[V]',
  '[O<]' = '[O<]',
  '[>O]' = '[>O]',
  '[>O<]' = '[>O<]',
}

export interface CreateWindowFormPVCI extends Omit<WindowI, 'id' | 'price'> {
  jwt?: string
  projectData: ProjectDataProps
  quotationID: number | string
  windowID?: number | string
  dismount: boolean
}

export interface CreateWindowPVCI extends Pick<WindowI, 'title' | 'location' | 'width' | 'height' | 'price'> {
  jwt?: string
  cost: number
  profit: number
  quotation: QuotationI['id']
  window: WindowI['id']
}

export interface ClientQuotationResponseI {
  data: ClientData
}

export interface ClientData {
  id: number
  attributes: ClientAttributes
}

export interface ClientAttributes {
  fullName: string
  cellphone: string
  address: string
  email: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}

export interface WindowsQuotationResponseI {
  data: WindowsDatum[]
}

export interface WindowsDatum {
  id: number
  attributes: WindowsAttributes
}

export interface WindowsAttributes {
  title: string
  location: string
  width: number
  height: number
  price: number
  cost: number
  profit: number
  cant: number
  model: WindowModelsEnum
  color: string
  glass: string
  description: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}
