import React, { useState, useContext } from 'react'
import { TextInput, Toast } from 'flowbite-react'
import { useCartMutations } from '@context/CartContext'
import { CartItemI } from '@models/CartItem.model'
import { CheckIcon } from '@heroicons/react/24/solid'

type AddToCartProps = {
  product: CartItemI
}

const addToCartRequest = () =>
  new Promise((resolve, reject) => {
    window.setTimeout(resolve, 600)
  })

const validate = (quantity: number) => {
  let error = ''
  if (quantity < 1) error = "Can't be blank"
  return error
}

const AddToCart = ({ product }: AddToCartProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)
  const { addToCart } = useCartMutations()

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 500)
  }

  const handleSubmit = async () => {
    const error = validate(quantity)
    setError(error)

    if (!error) {
      setLoading(true)
      addToCartRequest()
        .then(() => {
          addToCart(product, quantity)
          setLoading(false)
          setQuantity(quantity)
          setVisible(true)
          toggleMessage()
        })
        .catch((err: Error) => {
          setError(`Error: ${err}` || 'Something went wrong')
          setLoading(false)
        })
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(target.value, 10))

  return (
    <>
      {/*  <Input
        type='number'
        placeholder='Quantity'
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleChange}
        action={{
          color: 'green',
          content: 'Add to Cart',
          icon: 'plus cart',
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      />
     {error && <div style={{ color: 'red', position: 'absolute' }}>{error}</div>} */}
          
      <Toast>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
          <CheckIcon className='w-4 h-4' />
        </div>
        <CheckIcon className='w-4 h-4' />
        <div className='ml-3 text-sm font-normal'>Item moved successfully.</div>
        <Toast.Toggle />
      </Toast>
    </>
  )
}

export default AddToCart
