import React from 'react'
import { useCart, useCartMutations } from '@context/CartContext'
import Container from '@components/Container'
import Heading from '@components/Heading'
import SummaryList from '@components/Public/Summary/SummaryList'
import { currencyFormatter } from '@utils/currencyFormatter'

const CartPage = () => {
  const { items, count, subTotal } = useCart()
  const { removeFromCart } = useCartMutations()

  return (
    <Container>
      <Heading as='h2'>Resumén de compra</Heading>
      <SummaryList windows={items} />
      <p>cant: {count} </p>
      <p>Subtotal: {currencyFormatter(subTotal)}</p>
      <hr />
      {/*  <CartSummary totalAmount={count} /> */}
      <p>Añadir otra ventana</p>
    </Container>
  )
}

export default CartPage
