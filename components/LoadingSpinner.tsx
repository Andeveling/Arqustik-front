import { Spinner } from "flowbite-react"

export default function LoadingSpinner() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Spinner size='xl' color='warning' />
    </div>
  )
}
