import LoadingSpinner from '@components/LoadingSpinner'
import { SystemResponseI } from '@models/System.model'
import { Button, Tooltip } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'

const SystemCard = ({ system }: { system: SystemResponseI['data'] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border-b-2 pb-6 border-gray-600 dark:border-gray-50'>
      <div>
        <Image
          loading='lazy'
          width={600}
          height={375}
          src={`/img/${system.attributes.title}.jpg`}
          alt={system.attributes.title}
        />
      </div>
      <div className='flex justify-between flex-col '>
        <h1 className='mb-2 font-bold text-3xl sm:text-5xl'>{system.attributes.title.toUpperCase()}</h1>
        <p className='text-xl text-justify'>{system.attributes.description}</p>
        <div className='flex w-full mt-4 justify-center sm:justify-end gap-4 '>
          <Tooltip content='Ver modelos disponibles'>
            <Link href={`quote/systems/${system.attributes.title}`}>
              <Button
                size='xl'
                color='dark'
                className='transition ease-in-out delay-150  hover:scale-110  duration-150'>
                Ver modelos
              </Button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
export default SystemCard
