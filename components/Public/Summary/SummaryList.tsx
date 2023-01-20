import { CartItemI } from '@models/CartItem.model'
import SummaryCard from './SummaryCard'

const SummaryList = ({ windows }: { windows: CartItemI[] }) => {
  return (
    <>
      {windows && windows.length ? (
        windows.map((item) => {
          return (
            <div key={item.id}>
              <SummaryCard window={item} />
            </div>
          )
        })
      ) : (
        <p>No tienes ventanas en el carrito.</p>
      )}
    </>
  )
}
export default SummaryList
