import SubmitInput from '@components/SubmitInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { QuotationI } from '@models/Quotation.model'
import { CreateWindowFormPVCI, WindowI } from '@models/WindowPVC.model'
import { getJWT } from '@services/getJWT.service'
import { windowPVC } from '@services/window.service'
import axios from 'axios'
import { Label, TextInput } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import SelectColorPVC from './SelectColorPVC'
import SelectGlass from './SelectGlass'
import SelectModel from './SelectModel'
import SelectSystem from './SelectSystem'
import SelectType from './SelectType'
import SelectWindowsDetails from './SelectWindowsDetails'
import TitleLocation from './TitleLocation'
import { ProjectDataProps } from './WindowsPVCForm'
import { WindowsPVCSchema } from './WindowsPVCSchema'

const WindowsPVCUpdateForm = ({
  projectData,
  windowID,
}: {
  projectData: ProjectDataProps
  windowID: WindowI['id']
}) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const methods = useForm<CreateWindowFormPVCI>({
    resolver: yupResolver(WindowsPVCSchema),
  })
  const quotationID: QuotationI['id'] = typeof router.query.quotation === 'string' ? router.query.quotation : ''

  const { handleSubmit } = methods
  const onSubmit: SubmitHandler<CreateWindowFormPVCI> = async (data) => {
    setLoading(true)
    const jwt = await getJWT()
    toast
      .promise(
        axios
          .put(`/api/windows/update`, {
            ...data,
            projectData,
            quotationID,
            windowID,
          })
          .then((res) =>
            windowPVC
              .update(res.data, windowID)
              .then((res) => res)
              .then(() => methods.reset())
              .then(() => router.reload())
              .catch((err) => err),
          ),
        {
          loading: 'Actualizando...',
          success: <b>¡Ventana Actualizada!</b>,
          error: <b>Algo salio mal</b>,
        },
      )
      .then(() => setLoading(false))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*  Nombre y ubicacion */}
        <TitleLocation />
        {/* 1. seleccionar el sistema */}
        <SelectSystem />
        {/* 2. seleccionar el tipo, ventana, puerta ventana */}
        <SelectType />
        {/* 3. Seleccionar modelos */}
        <SelectModel />
        {/* 4. Detalles de la ventana */}
        <SelectWindowsDetails />
        {/* 5. Seleccionar vidrio */}
        <SelectGlass />
        {/* 6. Color PVC */}
        <SelectColorPVC />
        {/* Cant */}
        <div className='mb-4'>
          <Label htmlFor='cant'>Cantidad</Label>
          <TextInput id='cant' defaultValue={1} addon='cant' type='number' {...methods.register('cant')} />
          {methods.formState.errors.cant?.message ? (
            <p className='text-xs text-red-500'>{methods.formState.errors.cant.message}</p>
          ) : (
            <></>
          )}
        </div>

        <SubmitInput isLoading={methods.formState.isSubmitting || loading} value={'Actualizar'} />
      </form>
    </FormProvider>
  )
}
export default WindowsPVCUpdateForm
