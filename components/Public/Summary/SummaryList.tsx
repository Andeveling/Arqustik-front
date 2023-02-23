import { CartItemI } from '@models/CartItem.model'
import SummaryCard from './SummaryCard'
import Link from 'next/link'
import { PublicRoutes } from 'routes'

const SummaryList = ({ windows }: { windows: CartItemI[] }) => {
  return (
    <>
      {windows && windows.length ? (
        windows.map((item) => {
          return <SummaryCard key={item.id} window={item} />
        })
      ) : (
        <p className='text-lg mt-4'>
          No tienes ventanas a cotizar{' '}
          <b className='text-orange-500'>
            <Link href={PublicRoutes.HOME}>Ir a cotizar</Link>
          </b>
          .
        </p>
      )}
    </>
  )
}
export default SummaryList
