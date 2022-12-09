import { ClientQuotationResponseI, WindowsQuotationResponseI } from "./WindowPVC.model"

export enum SiliconeEnum {
  zero = "zero",
  one = "one",
  two = "two",
}
export enum ProtectionEnum {
  zero = "zero",
  one = "one",
  two = "two",
}

export interface CreateQuotationI {
  project: string
  arqustik_id: string
  address: string
  clientID: string
  comment: string

  installation: boolean
  transport: boolean
  polyurethane: boolean

  protection: string
  silicone: string

  transport_mount: number
}
export interface ClientByIDResponse {
  data: ClientByIDI
  meta: Meta
}

export interface ClientByIDI {
  id: number
  attributes: DataAttributes
}

export interface DataAttributes {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  fullName: string
  cellphone: string
  address: string
  email: string
  quotations: QuotationsI
  client: ClientQuotationResponseI
  windows: WindowsQuotationResponseI
}

export interface QuotationsI {
  data: QuotationI[]
}

export interface QuotationResponseI {
  data: QuotationI
  meta: Meta
}
export interface QuotationI {
  id: number | string
  attributes: QuotationAttributes
}

export interface QuotationAttributes {
  arqustik_id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  address: string
  project: string
  comment: string
  installation: boolean
  protection: string
  transport: boolean
  transport_mount?: number
  polyurethane: boolean
  silicone: SiliconeEnum
  client: ClientQuotationResponseI
  windows: WindowsQuotationResponseI
}

export interface Meta {}
