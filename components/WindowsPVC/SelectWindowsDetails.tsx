import { ArrowsRightLeftIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid"
import { CreateWindowPVCI } from "@models/WindowPVC.model"
import { Label, TextInput } from "flowbite-react"
import { useFormContext } from "react-hook-form"

export default function SelectWindowsDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateWindowPVCI>()
  return (
    <>
      <div className='grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4'>
        <div className='mb-4'>
          <Label htmlFor='width'>Ancho</Label>
          <TextInput
            id='width'
            icon={ArrowsRightLeftIcon}
            addon='mm'
            type='number'
            {...register("width")}
            placeholder='600-4200'
          />
          {errors.width?.message ? <p className='text-xs text-red-500'>{errors.width.message}</p> : <></>}
        </div>
        <div className='mb-4'>
          <Label htmlFor='height'>Alto mm</Label>
          <TextInput
            id='height'
            icon={ArrowsUpDownIcon}
            addon='mm'
            type='number'
            {...register("height")}
            placeholder='600-2400'
          />
          {errors.height?.message ? <p className='text-xs text-red-500'>{errors.height.message}</p> : <></>}
        </div>
      </div>
    </>
  )
}
