import SubmitInput from "@components/SubmitInput"
import { Transition } from "@headlessui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateQuotationI, ProtectionEnum, SiliconeEnum } from "@models/Quotation.model"
import { quotationPVC } from "@services/quotation.service"
import { Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react"
import { useRouter } from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { QuotationSchema } from "./QuotationSchema"

const QuotationForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateQuotationI>({
    resolver: yupResolver(QuotationSchema),
    defaultValues: {
      transport: false,
    },
    mode: "onChange",
  })

  const watchTransport = watch("transport")

  const onSubmit: SubmitHandler<CreateQuotationI> = async (data) => {
    setIsLoading(true)
    toast.promise(
      quotationPVC
        .create({
          data: {
            client: router.query?.id,
            project: data.project,
            arqustik_id: data.arqustik_id,
            address: data.address,
            comment: data.comment,

            installation: data.installation,
            transport: data.transport,
            polyurethane: data.polyurethane,

            protection: data.protection,
            silicone: data.silicone,
            transport_mount: data.transport_mount,
          },
        })
        .then(() => reset())
        .then(() => router.reload()),
      {
        loading: "Creando...",
        success: <b>¡Cotización creada!</b>,
        error: <b>No se pudo crear</b>,
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Label htmlFor='project'>Nombre de Proyecto</Label>
        <TextInput type='text' id='project' {...register("project")} />
        <p className='pt-1 text-xs text-red-500'>{errors.project?.message}</p>
      </div>

      <div className='mb-4'>
        <Label htmlFor='arqustik_id'>ID Cotización</Label>
        <TextInput type='text' id='arqustik_id' {...register("arqustik_id")} />
        <p className='pt-1 text-xs text-red-500'>{errors.arqustik_id?.message}</p>
      </div>

      <div className='mb-4'>
        <Label htmlFor='address'>Dirección del proyecto</Label>
        <TextInput type='text' id='address' {...register("address")} />
        <p className='pt-1 text-xs text-red-500'>{errors.address?.message}</p>
      </div>
      <h3 className='mb-4 font-semibold text-gray-900 dark:text-white text-center'>Servicios</h3>
      <div className='mb-4'>
        <Label
          htmlFor='installation'
          className='flex items-center pl-4 p-4 rounded border border-gray-200 dark:border-gray-700'>
          <Checkbox id='installation' {...register("installation")} /> <span className='ml-4'>Instalacíon</span>
        </Label>
      </div>
      {/*  <div className='mb-4'>
        <Label
          htmlFor='protection'
          className='flex items-center pl-4 p-4 rounded border border-gray-200 dark:border-gray-700'>
          <Checkbox id='protection' {...register("protection")} />
          <span className='ml-4'>Protección</span>
        </Label>
      </div> */}

      <div className='mb-4'>
        <Label
          htmlFor='polyurethane'
          className='flex items-center pl-4 p-4 rounded border border-gray-200 dark:border-gray-700'>
          <Checkbox id='polyurethane' {...register("polyurethane")} />
          <span className='ml-4'>Sello con Poliuretano</span>
        </Label>
      </div>

      <div className='mb-4'>
        <Label
          htmlFor='transport'
          className='flex items-center pl-4 p-4 rounded border border-gray-200 dark:border-gray-700'>
          <Checkbox id='transport' {...register("transport")} />
          <span className='ml-4'>Transporte</span>
        </Label>
      </div>

      <Transition
        as='div'
        show={watchTransport}
        enter='transition-opacity duration-375'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-450'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <div className='mb-6'>
          <Label htmlFor='transport_mount'>Monto de transporte</Label>
          <TextInput
            id='transport_mount'
            placeholder='Introduce el valor en pesos'
            addon='$'
            type='number'
            pattern='^\$\d{1,3}(,\d{3})*(\.\d+)?$'
            {...register("transport_mount")}
          />
        </div>
      </Transition>

      <div className='mb-6'>
        <Label htmlFor='select-model-windows'> Seleccionar Tipo de Protección</Label>
        <Select id='select-model-windows' addon='Protección' {...register("protection")}>
          <option value={ProtectionEnum.zero}>No lleva</option>
          <option value={ProtectionEnum.one}>1 Cara</option>
          <option value={ProtectionEnum.two}>2 Caras</option>
        </Select>
      </div>
      <div className='mb-6'>
        <Label htmlFor='select-model-windows'> Seleccionar Silicona</Label>
        <Select id='select-model-windows' addon='Silicona' {...register("silicone")}>
          <option value={SiliconeEnum.zero}>No lleva</option>
          <option value={SiliconeEnum.one}>1 Cara</option>
          <option value={SiliconeEnum.two}>2 Caras</option>
        </Select>
      </div>

      <div className='mb-4'>
        <Label htmlFor='comment'>Observaciones</Label>
        <Textarea id='comment' rows={4} placeholder='Añade algún comentario aca...' {...register("comment")} />
        <p className='pt-1 text-xs text-red-500'>{errors.comment?.message}</p>
      </div>

      <SubmitInput value='Añadir' isLoading={isLoading} />
    </form>
  )
}
export default QuotationForm
