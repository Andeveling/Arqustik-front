import { Dispatch, SetStateAction } from 'react'
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
export interface CartShowPriceT {
  showPrice: boolean
  setShowPrice: Dispatch<SetStateAction<boolean>>
}

export interface CartHtmlStringT {
  html: string
  setHtml: Dispatch<SetStateAction<string>>
}
