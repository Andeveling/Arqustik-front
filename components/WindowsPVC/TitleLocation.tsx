import { CreateWindowPVCI } from "@models/WindowPVC.model";
import { Label, TextInput } from "flowbite-react";
import { useFormContext } from "react-hook-form";

export default function TitleLocation() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateWindowPVCI>();
  return (
    <>
      <div className='mb-6'>
        <Label htmlFor='window-title'>Titulo</Label>
        <TextInput id='window-title' type='text' addon='Titulo' placeholder='Ejem: V1, V2, V3' {...register("title")} />
        {errors.title ? <p className='text-xs text-red-500'>{errors.title.message}</p> : <></>}
      </div>
      <div className='mb-6'>
        <Label htmlFor='window-location'>Ubicación</Label>
        <TextInput
          id='window-location'
          type='text'
          addon='Ubicación'
          placeholder='Ejem: Alcoba 1'
          {...register("location")}
        />
        {errors.location ? <p className='text-xs text-red-500'>{errors.location.message}</p> : <></>}
      </div>
    </>
  );
}
