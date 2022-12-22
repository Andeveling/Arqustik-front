import { SystemResponseI } from '@models/System.model'
import { Button } from 'flowbite-react'
import Image from 'next/image'

const SystemCard = ({ system }: { system: SystemResponseI['data'] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border-b-2 pb-6 border-gray-600 dark:border-gray-50'>
      <div>
        <Image src={`/img/${system.attributes.title}.jpg`} width={600} height={100} alt={system.attributes.title} />
      </div>
      <div className='flex justify-between flex-col '>
        <h1 className='text-5xl mb-2 font-bold'>{system.attributes.title.toUpperCase()}</h1>
        <p className='text-xl text-justify'>{system.attributes.description}</p>
        <div className='flex w-full mt-4 justify-center sm:justify-end gap-4 '>
          <Button size='xl' color='dark'>
            Ventanas
          </Button>
          <Button size='xl' color='dark'>
            Puertas Ventanas
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SystemCard
