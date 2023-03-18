import { WindowI, WindowModelsEnum } from '@models/WindowPVC.model';
import ModelOX from './Windows/ModelOX';
import ModelOXX from './Windows/ModelOXX';
import ModelOXXO from './Windows/ModelOXXO';
import ModelXO from './Windows/ModelXO';
import ModelXX from './Windows/ModelXX';
import ModelXXO from './Windows/ModelXXO';
import ModelXXX from './Windows/ModelXXX';
import ModelO from './Windows/ModelO';
import ModelVLeft from './Windows/ModelVLeft';
import ModelVRight from './Windows/ModelVRight';
import ModelV from './Windows/ModelV';
import ModelVO from './Windows/ModelVO';
import ModelOV from './Windows/ModelOV';
import ModelVOV from './Windows/ModelVOV';
import ModelVV from './Windows/ModelVV';

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
      return <ModelXX width={width} height={height} />;
    case WindowModelsEnum.OX:
      return <ModelOX width={width} height={height} />;
    case WindowModelsEnum.XO:
      return <ModelXO width={width} height={height} />;
    case WindowModelsEnum.OXX:
      return <ModelOXX width={width} height={height} />;
    case WindowModelsEnum.XXO:
      return <ModelXXO width={width} height={height} />;
    case WindowModelsEnum.OXXO:
      return <ModelOXXO width={width} height={height} />;
    case WindowModelsEnum.XXX:
      return <ModelXXX width={width} height={height} />;
    case WindowModelsEnum['[O]']:
      return <ModelO width={width} height={height} />;
    case WindowModelsEnum['[>]']:
      return <ModelVLeft width={width} height={height} />;
    case WindowModelsEnum['[<]']:
      return <ModelVRight width={width} height={height} />;
    case WindowModelsEnum['[V]']:
      return <ModelV width={width} height={height} />;
    case WindowModelsEnum['[>O]']:
      return <ModelVO width={width} height={height} />;
    case WindowModelsEnum['[O<]']:
      return <ModelOV width={width} height={height} />;
    case WindowModelsEnum['[>O<]']:
      return <ModelVOV width={width} height={height} />;
    case WindowModelsEnum['[><]']:
      return <ModelVV width={width} height={height} />;
    default:
      return <div className='h-44 w-56 bg-gray-600'></div>;
  }
};
export default WindowDraw;
