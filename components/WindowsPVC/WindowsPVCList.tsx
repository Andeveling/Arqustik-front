import ModalEdit from "@components/ModalEdit"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { WindowI, WindowsQuotationResponseI } from "@models/WindowPVC.model"
import { windowPVC } from "@services/window.service"
import { Dropdown, Table } from "flowbite-react"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import { currencyFormatter } from "utils/currencyFormatter"
import { ProjectDataProps } from "./WindowsPVCForm"
import WindowsPVCUpdateForm from "./WindowsPVCUpdateForm"

const WindowsPVCList = ({
  windows,
  projectData,
  transport_mount,
}: {
  windows: WindowsQuotationResponseI
  projectData: ProjectDataProps
  transport_mount: number
}) => {
  let total = 0
  const router = useRouter()
  const handleDelete = async (id: WindowI["id"]) => {
    if (confirm("¿Desea borrar la ventana?")) {
      toast
        .promise(windowPVC.delete(id), {
          loading: "Borrando...",
          success: <b>¡Ventana borrada!</b>,
          error: <b>Algo salio mal</b>,
        })
        .then(() => router.reload())
    }
  }

  return (
    <div className='mt-2'>
      <hr className='my-2' />
      <p className='font-bold'>Ventanas</p>
      {windows && windows.data.length ? (
        <Table hoverable={true} striped={true}>
          <Table.Head>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell>Modelo</Table.HeadCell>
            <Table.HeadCell>Ancho</Table.HeadCell>
            <Table.HeadCell>Alto</Table.HeadCell>
            <Table.HeadCell>Precio/U</Table.HeadCell>
            <Table.HeadCell>Cantidad</Table.HeadCell>
            <Table.HeadCell>Editar</Table.HeadCell>
            <Table.HeadCell className='text-right'>Subtotal</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {windows.data.map((window) => {
              const {
                attributes: { title, width, height, price, cant, model },
              } = window
              total += price * cant
              return (
                <Table.Row key={window.id}>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell className='text-center'>{model}</Table.Cell>
                  <Table.Cell>{width} mm</Table.Cell>
                  <Table.Cell>{height} mm</Table.Cell>
                  <Table.Cell>{currencyFormatter(price)}</Table.Cell>
                  <Table.Cell>{cant} unds</Table.Cell>
                  <Table.Cell>
                    <Dropdown label='opciones' inline={true} placement='left' arrowIcon={false}>
                      <Dropdown.Item icon={PencilSquareIcon}>
                        <ModalEdit
                          title='Edita esta ventana'
                          form={<WindowsPVCUpdateForm windowID={window.id} projectData={projectData} />}
                        />
                      </Dropdown.Item>
                      <Dropdown.Item icon={TrashIcon} onClick={() => handleDelete(window.id)}>
                        Borrar
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className='text-right'>{currencyFormatter(cant * price)}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      ) : (
        <p>No hay ventanas para mostrar</p>
      )}
      <hr className='my-2' />
      <div className='grid grid-cols-2'>
        <p>Subtotal</p> <span className='text-right pr-6'>{currencyFormatter(total)}</span>
        <p>IVA 19%</p> <span className='text-right pr-6'>{currencyFormatter(total * 0.19)}</span>
        <p>Transporte</p> <span className='text-right pr-6'>{currencyFormatter(transport_mount)}</span>
        <p>Total</p>{" "}
        <span className='text-right pr-6 font-bold'>{currencyFormatter(total * 1.19 + transport_mount)}</span>
      </div>
    </div>
  )
}
export default WindowsPVCList
