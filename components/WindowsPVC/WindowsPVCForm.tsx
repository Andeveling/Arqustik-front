import SubmitInput from '@components/SubmitInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { QuotationI } from '@models/Quotation.model'
import { CreateWindowFormPVCI, WindowTypeEnum } from '@models/WindowPVC.model'
import { getJWT } from '@services/getJWT.service'
import { windowPVC } from '@services/window.service'
import axios from 'axios'
import { Checkbox, Label, TextInput } from 'flowbite-react'
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
import { WindowsPVCSchema } from './WindowsPVCSchema'
import { SystemsEnum } from '@models/System.model'

export interface ProjectDataProps {
  installation: boolean
  polyurethane: boolean
  transport: boolean
  protection: string
  silicone: string
}

const WindowsPVCForm = ({ projectData }: { projectData: ProjectDataProps }) => {
  const [loading, setLoading] = useState(false)
  const methods = useForm<CreateWindowFormPVCI>({
    resolver: yupResolver(WindowsPVCSchema),
    defaultValues: {
      system: SystemsEnum.BellaSliding,
      type: WindowTypeEnum.WINDOW,
    },
  })
  const router = useRouter()
  const quotationID: QuotationI['id'] = typeof router.query.quotation === 'string' ? router.query.quotation : ''

  const { handleSubmit, register } = methods
  const onSubmit: SubmitHandler<CreateWindowFormPVCI> = async (data) => {
    setLoading(true)
    const jwt = await getJWT()
    toast
      .promise(
        axios
          .post(`/api/windows/create`, {
            ...data,
            projectData,
            jwt,
            quotationID,
          })
          .then((res) =>
            windowPVC
              .create(res.data)
              .then((res) => console.log(res))
              .then(() => methods.reset())
              .catch((err) => console.log(err)),
          )
          .catch((err) => console.log(err)),
        {
          loading: 'Creando...',
          success: <b>¡Ventana creada!</b>,
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
          <TextInput id='cant' defaultValue={1} addon='cant' type='number' {...register('cant')} />
          {methods.formState.errors.cant?.message ? (
            <p className='text-xs text-red-500'>{methods.formState.errors.cant.message}</p>
          ) : (
            <></>
          )}
        </div>

        <div className='mb-4'>
          <Label
            htmlFor='dismount'
            className='flex items-center pl-4 p-4 rounded border border-gray-200 dark:border-gray-700'>
            <Checkbox id='dismount' {...register('dismount')} />
            <span className='ml-4'>Desmonte</span>
          </Label>
        </div>

        <SubmitInput isLoading={methods.formState.isSubmitting || loading} value={'CREAR'} />
      </form>
    </FormProvider>
  )
}
export default WindowsPVCForm

/* 
{
  title: 'V5',
   width: 1200,
  height: 1200,
  location: 'Alcoba 1',
  cant: '1',
  quotation: '38',
  cost: 541087.0880940001,
  profit: 278741.8332605455,
  price: 819828.9213545456,
  glass: 'Crudo Simple 4 mm',
  system: 'everestmax',
  type: 'window',
 
  model: '[>]',
  color: 'blanco',
  description: 'Ventana Europea EVERESTMAX'
}

{
  title: 'V6',
  height: 1200,
  width: 1200,
  location: 'Alcoba 1',
  cant: '1',
  dismount: false,
  system: 'bella-sliding',
  type: 'window',
  model: 'OX',
  glass: '4mmCI',
  color: 'blanco',
  projectData: {
    installation: true,
    polyurethane: true,
    silicone: 'one',
    transport: true,
    protection: 'one'
  },
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1NDM3MzM1LCJleHAiOjE2NzgwMjkzMzV9.andik53osbuOMjuuLxlvAg2a_jb_1LxoyZIUd4v-P4U',
  quotationID: '38'
}

*/
