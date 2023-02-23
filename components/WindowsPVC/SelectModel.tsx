import { SystemsEnum } from '@models/System.model'
import { WindowModelsEnum, WindowTypeEnum } from '@models/WindowPVC.model'
import { Label, Select } from 'flowbite-react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export default function SelectModel() {
  const { register, watch, setValue } = useFormContext()
  // console.log({ value: getValues('system') })
  // console.log({ watch: watch('system') })
  const systemSelect = watch('system')
  const typeSelect = watch('type')

  /*  switch (systemSelect) {
    case SystemsEnum.BellaSliding:
      return (
        <Select id='select-model-windows' addon='modelo' {...register('model')}>
          <option value={WindowModelsEnum.OX}>{WindowModelsEnum.OX}</option>
          <option value={WindowModelsEnum.XO}> {WindowModelsEnum.XO}</option>
          <option value={WindowModelsEnum.XX}>{WindowModelsEnum.XX}</option>
          <option value={WindowModelsEnum.OXX}>{WindowModelsEnum.OXX}</option>
          <option value={WindowModelsEnum.XXO}>{WindowModelsEnum.XXO}</option>
          <option value={WindowModelsEnum.XXX}>{WindowModelsEnum.XXX}</option>
          <option value={WindowModelsEnum.OXXO}>{WindowModelsEnum.OXXO}</option>
        </Select>
      )
    case SystemsEnum.EverestMax:
      switch (typeSelect) {
        case WindowTypeEnum.WINDOW:
          return (
            <Select id='select-model-windows' addon='modelo' {...register('model')}>
              <option value={WindowModelsEnum['[O]']}>{WindowModelsEnum['[O]']}</option>
              <option value={WindowModelsEnum['[V]']}>{WindowModelsEnum['[V]']}</option>
              <option value={WindowModelsEnum['[>]']}>{WindowModelsEnum['[>]']}</option>
              <option value={WindowModelsEnum['[<]']}>{WindowModelsEnum['[<]']}</option>
              <option value={WindowModelsEnum['[><]']}>{WindowModelsEnum['[><]']}</option>
              <option value={WindowModelsEnum['[>O]']}>{WindowModelsEnum['[>O]']}</option>
              <option value={WindowModelsEnum['[O<]']}>{WindowModelsEnum['[O<]']}</option>
              <option value={WindowModelsEnum['[>O<]']}>{WindowModelsEnum['[>O<]']}</option>
            </Select>
          )
        case WindowTypeEnum.DOOR:
          return (
            <Select id='select-model-windows' addon='modelo' {...register('model')}>
              <option value={WindowModelsEnum['[>]']}>{WindowModelsEnum['[>]']}</option>
              <option value={WindowModelsEnum['[<]']}>{WindowModelsEnum['[<]']}</option>
              <option value={WindowModelsEnum['[><]']}>{WindowModelsEnum['[><]']}</option>
            </Select>
          )
      }
    default:
      return <></>
  } */

  return (
    <div className='mb-6'>
      <Label htmlFor='select-model-windows'> Seleccionar Apertura</Label>
      {systemSelect === SystemsEnum.BellaSliding ? (
        <Select id='select-model-windows' addon='modelo' {...register('model')}>
          <option value={WindowModelsEnum.OX}>{WindowModelsEnum.OX}</option>
          <option value={WindowModelsEnum.XO}> {WindowModelsEnum.XO}</option>
          <option value={WindowModelsEnum.XX}>{WindowModelsEnum.XX}</option>
          <option value={WindowModelsEnum.OXX}>{WindowModelsEnum.OXX}</option>
          <option value={WindowModelsEnum.XXO}>{WindowModelsEnum.XXO}</option>
          <option value={WindowModelsEnum.XXX}>{WindowModelsEnum.XXX}</option>
          <option value={WindowModelsEnum.OXXO}>{WindowModelsEnum.OXXO}</option>
        </Select>
      ) : typeSelect === WindowTypeEnum.WINDOW ? (
        <Select id='select-model-windows' addon='modelo' {...register('model')}>
          <option value={WindowModelsEnum['[O]']}>{WindowModelsEnum['[O]']}</option>
          <option value={WindowModelsEnum['[V]']}>{WindowModelsEnum['[V]']}</option>
          <option value={WindowModelsEnum['[>]']}>{WindowModelsEnum['[>]']}</option>
          <option value={WindowModelsEnum['[<]']}>{WindowModelsEnum['[<]']}</option>
          <option value={WindowModelsEnum['[><]']}>{WindowModelsEnum['[><]']}</option>
          <option value={WindowModelsEnum['[>O]']}>{WindowModelsEnum['[>O]']}</option>
          <option value={WindowModelsEnum['[O<]']}>{WindowModelsEnum['[O<]']}</option>
          <option value={WindowModelsEnum['[>O<]']}>{WindowModelsEnum['[>O<]']}</option>
        </Select>
      ) : (
        <Select id='select-model-windows' addon='modelo' {...register('model')}>
          <option value={WindowModelsEnum['[>]']}>{WindowModelsEnum['[>]']}</option>
          <option value={WindowModelsEnum['[<]']}>{WindowModelsEnum['[<]']}</option>
          <option value={WindowModelsEnum['[><]']}>{WindowModelsEnum['[><]']}</option>
        </Select>
      )}
    </div>
  )
}
