import { SystemI } from '@models/System.model'
import { systemsService } from '@services/systems.service'
import { Button, Card } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

const SystemCard = ({ system }: { system: SystemI }) => {
  const {
    id,
    attributes: { title, update, description, updatedAt },
  } = system
  const session = useSession()
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateHandle = async (id: number) => {
    setLoading(true)
    try {
      await systemsService.update(id)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Card>
      <h5 className='text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{title.toUpperCase()}</h5>
      <p className='font-normal text-gray-700 dark:text-gray-400'>{description}</p>
      <p className='font-normal text-green-700 dark:text-green-400'>
        Ultima Actualización: {new Date(updatedAt).toLocaleString()}
      </p>
      <div className='flex justify-end'>
        {update ? <Button onClick={() => updateHandle(id)}>{loading ? 'loading' : 'Actualizar'}</Button> : <></>}
      </div>
    </Card>
  )
}
export default SystemCard
