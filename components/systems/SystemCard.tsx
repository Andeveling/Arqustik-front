import { SystemI } from "@models/System.model"
import { arqustikConfig } from "arqustik.config"
import axios from "axios"
import { Button, Card } from "flowbite-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import useSWR, { useSWRConfig } from "swr"

const URL = `${arqustikConfig.NEXT_SERVER}/systems/update-system`

const updateSystem = (url: string, body: any) => {
  axios
    .put(url, body)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

const SystemCard = ({ system }: { system: SystemI }) => {
  const {
    id,
    attributes: { title, update, description, updatedAt },
  } = system
  const session = useSession()
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateHandle = (id: number) => {
    setLoading(true)
    mutate(
      URL,
      updateSystem(URL, {
        jwt: session.data?.user.jwt,
        systemID: id,
        data: {
          update: false,
        },
      })
    ).then(() => router.reload())
  }

  return (
    <Card>
      <h5 className='text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{title.toUpperCase()}</h5>
      <p className='font-normal text-gray-700 dark:text-gray-400'>{description}</p>
      <p className='font-normal text-green-700 dark:text-green-400'>
        Ultima Actualización: {new Date(updatedAt).toLocaleString()}
      </p>
      <div className='flex justify-end'>
        {update ? <Button onClick={() => updateHandle(id)}>{loading ? "loading" : "Actualizar"}</Button> : <></>}
      </div>
    </Card>
  )
}
export default SystemCard
