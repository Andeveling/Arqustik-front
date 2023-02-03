import { WindowI, WindowModelsEnum } from '@models/WindowPVC.model'
import ModelOX from './Windows/ModelOX'
import ModelOXX from './Windows/ModelOXX'
import ModelOXXO from './Windows/ModelOXXO'
import ModelXO from './Windows/ModelXO'
import ModelXX from './Windows/ModelXX'
import ModelXXO from './Windows/ModelXXO'
import ModelXXX from './Windows/ModelXXX'

const WindowDraw = ({
  height,
  width,
  model,
}: {
  height: WindowI['height']
  width: WindowI['width']
  model: WindowI['model']
}) => {
  switch (model) {
    case WindowModelsEnum.XX:
      return <ModelXX width={width} height={height} />
    case WindowModelsEnum.OX:
      return <ModelOX width={width} height={height} />
    case WindowModelsEnum.XO:
      return <ModelXO width={width} height={height} />
    case WindowModelsEnum.OXX:
      return <ModelOXX width={width} height={height} />
    case WindowModelsEnum.XXO:
      return <ModelXXO width={width} height={height} />
    case WindowModelsEnum.OXXO:
      return <ModelOXXO width={width} height={height} />
    case WindowModelsEnum.XXX:
      return <ModelXXX width={width} height={height} />
    default:
      return <div className='h-44 w-56 bg-gray-600'></div>
  }
}
export default WindowDraw
