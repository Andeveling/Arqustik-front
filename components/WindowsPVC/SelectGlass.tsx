import { Label, Select } from "flowbite-react"
import { useFormContext } from "react-hook-form"

export default function SelectGlass() {
  const { register } = useFormContext()
  return (
    <div className='mb-6'>
      <Label htmlFor='select-glass'>Seleccionar Cristal</Label>
      <Select id='select-glass' addon='Vidrio' {...register("glass")}>
        {/* llamar vidrios disponibles */}
        <option value='4mmCI'>4mm simple</option>
        <option value='5mmTI'>5mm templado</option>
        <option value='8mmLI'>8mm laminado</option>
      </Select>
    </div>
  )
}
