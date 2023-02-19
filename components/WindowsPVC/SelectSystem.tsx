import { SystemsEnum } from '@models/System.model'
import { Label, Select } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'

export default function SelectSystem() {
  const { register } = useFormContext()
  return (
    <div className='mb-6'>
      <Label htmlFor='select-system-windows'>Seleccionar sistema</Label>
      <Select id='select-system-windows' addon='Sistema' {...register('system')}>
        <option value={SystemsEnum.BellaSliding}>Bella Sliding</option>
        <option value={SystemsEnum.EverestMax}>Everest Max</option>
      </Select>
    </div>
  )
}
