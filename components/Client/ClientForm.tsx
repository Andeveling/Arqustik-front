import SubmitInput from "@components/SubmitInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateClientI } from "@models/Client.model"
import { clientPVC } from "@services/client.service"
import { Label, TextInput } from "flowbite-react"
import { useRouter } from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CreateClientSchema } from "./ClientSchema"

const ClientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateClientI>({
    resolver: yupResolver(CreateClientSchema),
  })
  const onSubmit: SubmitHandler<CreateClientI> = async (data) => {
    setIsLoading(true)
    toast.promise(
      clientPVC
        .create({
          data: {
            fullName: data.fullName,
            cellphone: data.cellphone,
            address: data.address,
            email: data.email,
          },
        })
        .then(() => router.reload())
        .then(() => reset()),
      {
        loading: "Creando...",
        success: <b>¡Cliente creado!</b>,
        error: <b>No se pudo crear el Cliente</b>,
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
        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Correo electronico
        </label>
        <TextInput type='email' id='email' {...register("email")} />
        <p className='pt-1 text-xs text-red-500'>{errors.email?.message}</p>
      </div>

      <SubmitInput value='Añadir' isLoading={isLoading} />
    </form>
  )
}
export default ClientForm
