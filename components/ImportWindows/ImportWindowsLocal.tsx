import { WindowI } from '@models/WindowPVC.model'
import { FileInput, Label } from 'flowbite-react'
import { ChangeEvent, useState } from 'react'

const ImportWindowsLocal = () => {
  const [files, setFiles] = useState<WindowI[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0], 'UTF-8')
    fileReader.onload = (e) => {
      console.log('e.target.result', e.target.result)
      setFiles(JSON.parse(e.target.result))
    }
  }

  return (
    <>
      <h1>Upload Json file - Example</h1>

      <Label htmlFor='file' value='Subir un Archivo' />
      <FileInput id='file' helperText='Adjunte un archivo json' required={true} onChange={handleChange} />
      <br />
      {'uploaded file content -- '}
      {files.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </>
  )
}
export default ImportWindowsLocal
