import { InterestedWindowI } from '@models/Interested.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import { Table } from 'flowbite-react'

const InterestedWindowsList = ({ windows }: { windows: InterestedWindowI[] }) => {
  let total = 0
  return (
    <div>
      {windows && windows.length > 0
        ? windows.map((window) => {
            return (
              <div key={window.id}>
                <Table hoverable={true} striped={true}>
                  <Table.Head>
                    <Table.HeadCell>Titulo</Table.HeadCell>
                    <Table.HeadCell>Modelo</Table.HeadCell>
                    <Table.HeadCell>Ancho</Table.HeadCell>
                    <Table.HeadCell>Alto</Table.HeadCell>
                    <Table.HeadCell>Precio/U</Table.HeadCell>
                    <Table.HeadCell>Cantidad</Table.HeadCell>
                    <Table.HeadCell className='text-right'>Subtotal</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className='divide-y'>
                    {windows.map(({ title, width, height, price, cant, model }) => {
                      total += price * cant
                      return (
                        <Table.Row key={window.id}>
                          <Table.Cell>{title}</Table.Cell>
                          <Table.Cell>{model}</Table.Cell>
                          <Table.Cell>{width} mm</Table.Cell>
                          <Table.Cell>{height} mm</Table.Cell>
                          <Table.Cell>{currencyFormatter(price)}</Table.Cell>
                          <Table.Cell>{cant} unds</Table.Cell>
                          <Table.Cell className='text-right'>{currencyFormatter(cant * price)}</Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <div className='mt-4 text-lg px-2'>
                  <div className='flex justify-between '>
                    <span>Subtotal:</span>
                    <span>{currencyFormatter(total)}</span>
                  </div>
                  <div className='flex justify-between '>
                    <span>IVA:</span>
                    <span>{currencyFormatter(total * 0.19)}</span>
                  </div>
                  <div className='flex justify-between '>
                    <span>Total:</span>
                    <span>{currencyFormatter(total * 1.19)}</span>
                  </div>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}
export default InterestedWindowsList
