import { WindowModelsEnum } from "@models/WindowPVC.model"
import { Label, Select } from "flowbite-react"
import { useFormContext } from "react-hook-form"

export default function SelectModel() {
  const { register, watch } = useFormContext()
  /*   console.log(watch("system")) */

  return (
    <div className='mb-6'>
      <Label htmlFor='select-model-windows'> Seleccionar Apertura</Label>
      <Select id='select-model-windows' addon='modelo' {...register("model")}>
        {/* TODO: traer sistemas disponibles?? */}
        <option value={WindowModelsEnum.OX}>{WindowModelsEnum.OX}</option>
        <option value={WindowModelsEnum.XO}> {WindowModelsEnum.XO}</option>
        <option value={WindowModelsEnum.XX}>{WindowModelsEnum.XX}</option>
        <option value={WindowModelsEnum.OXX}>{WindowModelsEnum.OXX}</option>
        <option value={WindowModelsEnum.XXO}>{WindowModelsEnum.XXO}</option>
        <option value={WindowModelsEnum.XXX}>{WindowModelsEnum.XXX}</option>
        <option value={WindowModelsEnum.OXXO}>{WindowModelsEnum.OXXO}</option>
      </Select>
    </div>
  )
}
