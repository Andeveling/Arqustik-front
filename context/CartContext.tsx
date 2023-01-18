import { CartActionT, CartHtmlStringT, CartItemI, CartShowPriceT, CartStateI } from '@models/CartItem.model'
import { Dispatch, ReactNode, createContext, useContext, useReducer, useState } from 'react'

const initialState = {} as CartStateI

export const CartItemsContext = createContext(initialState)
export const CartDispatchContext = createContext((() => {}) as Dispatch<CartActionT>)
export const PricesContext = createContext({} as CartShowPriceT)
export const HtmlMailContext = createContext({} as CartHtmlStringT)

const CartItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducers, initialState)
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [html, setHtml] = useState<string>('')
  return (
    <CartItemsContext.Provider value={state}>
      <HtmlMailContext.Provider
        value={{
          html,
          setHtml,
        }}>
        <PricesContext.Provider
          value={{
            showPrice,
            setShowPrice,
          }}>
          <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
        </PricesContext.Provider>
      </HtmlMailContext.Provider>
    </CartItemsContext.Provider>
  )
}

function cartReducers(state: CartStateI, { item, type }: CartActionT) {
  const existingCartItem = state[item.id]
  const key = 'state'

  switch (type) {
    case 'add':
      const newState = {
        ...state,
        [item.id]: { ...item },
      }
      return newState

    case 'remove': {
      if (existingCartItem == undefined) {
        return state
      }

      const newCartItems = { ...state }
      delete newCartItems[item.id]
      return newCartItems
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const getCartSubTotal = (sum: number, item: CartItemI) => {
  sum += item.price * item.cant
  return sum
}

const getCartCount = (sum: number, item: CartItemI) => sum + item.cant

export const useCart = () => {
  const itemsById = useContext(CartItemsContext)
  const handleShowPrice = useContext(PricesContext)
  const htmlString = useContext(HtmlMailContext)
  const items = Object.values(itemsById)
  const count = items.reduce(getCartCount, 0)
  const subTotal = items.reduce(getCartSubTotal, 0)

  return {
    items,
    itemsById,
    count,
    subTotal,
    handleShowPrice,
    htmlString,
  }
}

export const useCartMutations = () => {
  const dispatch = useContext(CartDispatchContext)

  const addToCart = (product: CartItemI) =>
    dispatch({
      type: 'add',
      item: product,
    })

  const removeFromCart = (product: CartItemI) =>
    dispatch({
      type: 'remove',
      item: product,
    })

  return {
    addToCart,
    removeFromCart,
  }
}

export default CartItemsContextProvider
