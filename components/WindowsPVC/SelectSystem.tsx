import { Label, Select } from "flowbite-react"
import { useFormContext } from "react-hook-form"

export default function SelectSystem() {
  const { register } = useFormContext()
  return (
    <div className='mb-6'>
      <Label htmlFor='select-system-windows'>Seleccionar sistema</Label>
      <Select id='select-system-windows' addon='Sistema' {...register("system")}>
        <option value='bella-sliding'>Bella Sliding</option>
      </Select>
    </div>
  )
}
