import SubmitInput from "@components/SubmitInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { ClientDataI, ClientI, UpdateClientI } from "@models/Client.model"
import { clientPVC } from "@services/client.service"
import { Label, TextInput } from "flowbite-react"
import { useRouter } from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CreateClientSchema } from "./ClientSchema"

const ClientUpdateForm = ({ client }: { client: ClientDataI }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateClientI>({
    resolver: yupResolver(CreateClientSchema),
    defaultValues: {
      fullName: client.attributes.fullName,
      cellphone: client.attributes.cellphone,
      address: client.attributes.address,
      email: client.attributes.email,
    },
  })
  const onSubmit: SubmitHandler<UpdateClientI> = async (data) => {
    setIsLoading(true)
    toast.promise(
      clientPVC
        .update(client.id, {
          data: {
            fullName: data.fullName,
            cellphone: data.cellphone,
            address: data.address,
            email: data.email,
          },
        })
        .then(() => reset())
        .then(() => router.reload()),
      {
        loading: "Actualizando...",
        success: <b>¡Cliente actualizado!</b>,
        error: <b>No se pudo actualizar el Cliente</b>,
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-6'>
        <Label htmlFor='fullName' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Nombre y apellidos
        </Label>
        <TextInput type='text' id='fullName' {...register("fullName")} />
        <p className='pt-1 text-xs text-red-500'>{errors.fullName?.message}</p>
      </div>

      <div className='mb-6'>
        <Label htmlFor='cellphone' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Celular
        </Label>
        <TextInput type='text' id='cellphone' {...register("cellphone")} />
        <p className='pt-1 text-xs text-red-500'>{errors.cellphone?.message}</p>
      </div>

      <div className='mb-6'>
        <Label htmlFor='address' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Dirección
        </Label>
        <TextInput type='text' id='address' {...register("address")} />
        <p className='pt-1 text-xs text-red-500'>{errors.address?.message}</p>
      </div>
      <div className='mb-6'>
        <Label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Correo electronico
        </Label>
        <TextInput type='email' id='email' {...register("email")} />
        <p className='pt-1 text-xs text-red-500'>{errors.email?.message}</p>
      </div>

      <SubmitInput value='Actualizar' isLoading={isLoading} />
    </form>
  )
}
export default ClientUpdateForm
