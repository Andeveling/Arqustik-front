import Container from '@components/Container'
import Heading from '@components/Heading'
import CartPrintFooter from '@components/Public/Summary/CartPrintFooter'
import CartPrintHeader from '@components/Public/Summary/CartPrintHeader'
import SummaryList from '@components/Public/Summary/SummaryList'
import SummaryModal from '@components/Public/Summary/SummaryModal'
import { useCart } from '@context/CartContext'
import { currencyFormatter } from '@utils/currencyFormatter'
import { Button } from 'flowbite-react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const CartPage = () => {
  const { items, count, subTotal } = useCart()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const componentRef = useRef(null)

  return (
    <Container>
      <div ref={componentRef}>
        <div className='flex justify-between print:hidden'>
          <Heading as='h3'>Resumén de compra</Heading>
          <Button onClick={handlePrint}>Print</Button>
        </div>
        <CartPrintHeader />

        <SummaryList windows={items} />

        <hr />
        {items && items.length ? (
          <>
            <div className='flex justify-between'>
              <p>Subtotal:</p>
              <span>{currencyFormatter(subTotal)}</span>
            </div>
            <div className='flex justify-between'>
              <p>IVA 19%:</p>
              <span>{currencyFormatter(subTotal * 0.19)}</span>
            </div>
            <div className='flex justify-between'>
              <p>Total:</p>
              <span>{currencyFormatter(subTotal * 1.19)}</span>
            </div>
            <div className='flex mt-8 justify-between'>
              <SummaryModal handlePrint={handlePrint} windows={items} />
            </div>
          </>
        ) : (
          <></>
        )}
        <CartPrintFooter />
      </div>
    </Container>
  )
}

export default CartPage
