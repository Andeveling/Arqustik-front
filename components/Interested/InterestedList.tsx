import Heading from '@components/Heading'
import { InterestedsResponseI } from '@models/Interested.model'
import { Button, Table } from 'flowbite-react'
import CreateInterestedToClient from './CreateInterestedToClient'
import DeletedInterestedModal from './DeletedInterestedModal'
import Link from 'next/link'

const InterestedList = ({ interestedList }: { interestedList: InterestedsResponseI }) => {
  return (
    <div>
      {interestedList && interestedList ? (
        <>
          <div className='overflow-x-auto p-2 relative sm:rounded-lg'>
            <Heading as='h4'>Interesados</Heading>
            <div>
              <Table hoverable={true} striped={true}>
                <Table.Head>
                  <Table.HeadCell>Nombre de cliente</Table.HeadCell>
                  <Table.HeadCell>Telefono</Table.HeadCell>
                  <Table.HeadCell>Correo</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Opciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y divide-gray-400'>
                  {interestedList &&
                    interestedList.data.map((interested) => {
                      const id = interested.id
                      const { fullName, cellphone, address, email } = interested.attributes
                      return (
                        <Table.Row className="pl-10'" key={id}>
                          <Table.Cell className='font-bold'>{fullName}</Table.Cell>
                          <Table.Cell>{cellphone}</Table.Cell>

                          <Table.Cell>{email}</Table.Cell>
                          <Table.Cell className='flex justify-center gap-2'>
                            <Link href={`/private/interested/${id}`}>
                              <Button size='sm' color='dark'>
                                Ventanas
                              </Button>
                            </Link>
                            <CreateInterestedToClient interested={interested} />
                            <DeletedInterestedModal id={id} />
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                </Table.Body>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
export default InterestedList
