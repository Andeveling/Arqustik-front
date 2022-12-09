import { ProtectionEnum, QuotationAttributes, SiliconeEnum } from "@models/Quotation.model"
import { currencyFormatter } from "@utils/currencyFormatter"
import { Badge, Card, Table } from "flowbite-react"

const QuotationHeader = ({
  info: { silicone, polyurethane, installation, protection, transport_mount },
}: {
  info: QuotationAttributes
}) => {
  const getService = (typeService: string) => {
    if (typeService === "silicone") {
      switch (silicone) {
        case SiliconeEnum.zero:
          return "NO"
        case SiliconeEnum.one:
          return "Una cara"
        case SiliconeEnum.two:
          return "Dos caras"
      }
    }
    if (typeService === "protection") {
      switch (protection) {
        case ProtectionEnum.zero:
          return "NO"
        case ProtectionEnum.one:
          return "Una cara"
        case ProtectionEnum.two:
          return "Dos caras"
      }
    }
  }

  return (
    <>
      <p className='font-bold'>Servicios</p>
      <Table>
        <Table.Head>
          <Table.HeadCell className='text-center'>Instalación</Table.HeadCell>
          <Table.HeadCell className='text-center'>Espuma</Table.HeadCell>
          <Table.HeadCell className='text-center'>Silicona</Table.HeadCell>
          <Table.HeadCell className='text-center'>Protección</Table.HeadCell>
          <Table.HeadCell className='text-center'>Transporte</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className='text-center'>{installation ? "SI" : "NO"}</Table.Cell>
            <Table.Cell className='text-center'>{polyurethane ? "SI" : "NO"}</Table.Cell>
            <Table.Cell className='text-center'>{getService("silicone")}</Table.Cell>
            <Table.Cell className='text-center'>{getService("protection")}</Table.Cell>
            <Table.Cell className='text-center'>
              {transport_mount ? <span>{currencyFormatter(transport_mount)}</span> : "NO"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  )
}
export default QuotationHeader
