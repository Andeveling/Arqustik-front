import { WindowsModelResponseI } from '@models/WindowModels.model'
import ModelsCard from './ModelsCard'
import {} from '@heroicons/react/24/solid'

const ModelsList = ({ models }: { models: WindowsModelResponseI[] }) => {
  return (
    <div className='flex flex-row flex-wrap justify-center items-center gap-3 w-full mt-2'>
      {models.map((item) => (
        <ModelsCard key={item.id} model={item} />
      ))}
    </div>
  )
}
export default ModelsList
