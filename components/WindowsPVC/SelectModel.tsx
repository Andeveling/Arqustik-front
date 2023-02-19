import { SystemsEnum } from '@models/System.model'
import { WindowType } from '@models/WindowModels.model'
import { WindowModelsEnum, WindowTypeEnum } from '@models/WindowPVC.model'
import { Label, Select } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'

export default function SelectModel() {
  const { register, getValues, watch } = useFormContext()
  // console.log({ value: getValues('system') })
  // console.log({ watch: watch('system') })
  return (
    <div className='mb-6'>
      <Label htmlFor='select-model-windows'> Seleccionar Apertura</Label>
      <Select id='select-model-windows' addon='modelo' {...register('model')}>
        {watch('system') === SystemsEnum.BellaSliding ? (
          <>
            <option value={WindowModelsEnum.OX}>{WindowModelsEnum.OX}</option>
            <option value={WindowModelsEnum.XO}> {WindowModelsEnum.XO}</option>
            <option value={WindowModelsEnum.XX}>{WindowModelsEnum.XX}</option>
            <option value={WindowModelsEnum.OXX}>{WindowModelsEnum.OXX}</option>
            <option value={WindowModelsEnum.XXO}>{WindowModelsEnum.XXO}</option>
            <option value={WindowModelsEnum.XXX}>{WindowModelsEnum.XXX}</option>
            <option value={WindowModelsEnum.OXXO}>{WindowModelsEnum.OXXO}</option>
          </>
        ) : watch('type') === WindowTypeEnum.WINDOW ? (
          <>
            <option value={WindowModelsEnum['[O]']}>{WindowModelsEnum['[O]']}</option>
            <option value={WindowModelsEnum['[V]']}>{WindowModelsEnum['[V]']}</option>
            <option value={WindowModelsEnum['[>]']}>{WindowModelsEnum['[>]']}</option>
            <option value={WindowModelsEnum['[<]']}>{WindowModelsEnum['[<]']}</option>
            <option value={WindowModelsEnum['[><]']}>{WindowModelsEnum['[><]']}</option>
            <option value={WindowModelsEnum['[>O]']}>{WindowModelsEnum['[>O]']}</option>
            <option value={WindowModelsEnum['[O<]']}>{WindowModelsEnum['[O<]']}</option>
            <option value={WindowModelsEnum['[>O<]']}>{WindowModelsEnum['[>O<]']}</option>
          </>
        ) : (
          <>
            <option value={WindowModelsEnum['[>]']}>{WindowModelsEnum['[>]']}</option>
            <option value={WindowModelsEnum['[<]']}>{WindowModelsEnum['[<]']}</option>
            <option value={WindowModelsEnum['[><]']}>{WindowModelsEnum['[><]']}</option>
          </>
        )}
      </Select>
    </div>
  )
}
