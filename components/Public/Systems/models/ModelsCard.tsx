import WindowDraw from '@components/QuotationPDF/WindowDraw'
import { WindowsModelResponseI } from '@models/WindowModels.model'
import { Card } from 'flowbite-react'
import Model3D from './Model3D'
import ModelModal from './ModelModal'

const ModelsCard = ({ model }: { model: WindowsModelResponseI }) => {
  return (
    <div className='w-96'>
      <Card className='min-w-lg' color='black'>
        <div className='flex justify-center'>
          <WindowDraw model={model.attributes.opening} height={0} width={0} />
        </div>

        <div>
          <div>
            <p className='text-orange-500'>
              Anchos: {model.attributes.minW}mm - {model.attributes.maxW}mm
            </p>
            <p className='text-orange-500'>
              Altos: {model.attributes.minH}mm - {model.attributes.maxH}mm
            </p>
          </div>
          <div className='flex justify-between mt-4'>
            <ModelModal model={model} />
            <Model3D url={model.attributes.model3D} />
          </div>
        </div>
      </Card>
    </div>
  )
}
export default ModelsCard
