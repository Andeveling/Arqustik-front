import { Button, FileInput, Label } from 'flowbite-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ImportWindows = () => {
  const [file, setFile] = useState<any>()
  const [lading, setIsLoading] = useState<boolean>(false)
  /*  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    if (e.target.files === null) return
    fileReader.readAsText(e.target.files[0], 'UTF-8')
    fileReader.onload = (e) => {
      if (e.target === null) return
      setFile(e.target.result)
    }
  } */

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true)
    console.log('subido')
    const fileReader = new FileReader()
    fileReader.readAsText(data.file[0], 'UTF-8')
    fileReader.onload = (e) => {
      setFile(fileReader.result)
    }
    console.log(JSON.parse(file))

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor='file' value='Subir un Archivo' />
      <FileInput id='file' helperText='Adjunte un archivo json' {...register('file')} />

      <Button color='success' type='submit'>
        Subir
      </Button>
    </form>
  )
}
export default ImportWindows
