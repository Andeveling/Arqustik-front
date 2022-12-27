import { WindowsModelResponseI } from '@models/WindowModels.model'
import ModelsCard from './ModelsCard'
import {} from '@heroicons/react/24/solid'

const ModelsList = ({ models }: { models: WindowsModelResponseI[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center gap-2 w-full mt-2'>
      {models.map((item) => (
        <div key={item.id} className='flex justify-center'>
          <ModelsCard model={item} />
        </div>
      ))}
    </div>
  )
}
export default ModelsList
