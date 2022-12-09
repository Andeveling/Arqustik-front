import { Label, Select } from "flowbite-react"
import { useFormContext } from "react-hook-form"

export default function SelectColorPVC() {
  const { register } = useFormContext()
  return (
    <div className='mb-6'>
      <Label id='select-color-pvc' htmlFor='color'>
        Color PVC
      </Label>
      <Select id='select-color-pvc' addon='color' {...register("color")}>
        <option value='blanco'>blanco</option>
      </Select>
    </div>
  )
}
