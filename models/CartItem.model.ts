import { WindowsModelAttributesI } from './WindowModels.model'
import { WindowI } from './WindowPVC.model'

export type QuantityT = number
export interface CartItemI extends WindowI {}
export interface CartStateI {
  [key: string]: CartItemI
}
export type CartActionT = {
  type: 'add' | 'remove'
  item: CartItemI
}
