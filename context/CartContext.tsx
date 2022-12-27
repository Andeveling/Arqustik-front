import { CartActionT, CartItemI, CartStateI } from '@models/CartItem.model'
import { persistLocalStorage } from '@utils/persistLocalStorage'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

const initialState = {} as CartStateI

export const CartItemsContext = createContext(initialState)
export const CartDispatchContext = createContext((() => {}) as Dispatch<CartActionT>)

const CartItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducers, initialState)

  return (
    <CartItemsContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
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
  const items = Object.values(itemsById)
  const count = items.reduce(getCartCount, 0)
  const subTotal = items.reduce(getCartSubTotal, 0)

  return {
    items,
    itemsById,
    count,
    subTotal,
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
function initiate(): CartActionT {
  throw new Error('Function not implemented.')
}
