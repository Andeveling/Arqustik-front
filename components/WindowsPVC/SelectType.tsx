import { Label, Select } from "flowbite-react";
import { useFormContext } from "react-hook-form";

export default function SelectType() {
  const { register } = useFormContext();

  return (
    <div className='mb-6'>
      <Label htmlFor='select-type-windows'> Seleccionar Tipo</Label>
      <Select id='select-type-windows' addon='Tipo' {...register("type")}>
        <option value='window'>Ventana</option>
        <option value='door'>Puerta Ventana</option>
      </Select>
    </div>
  );
}
