import { CartItemI } from '@models/CartItem.model'
import SummaryCard from './SummaryCard'
import { Card } from 'flowbite-react'

const SummaryList = ({ windows }: { windows: CartItemI[] }) => {
  return (
    <div>
      {windows && windows.length ? (
        windows.map((item) => {
          return (
            <div key={item.id}>
              <SummaryCard window={item} />
            </div>
          )
        })
      ) : (
        <></>
      )}
    </div>
  )
}
export default SummaryList
