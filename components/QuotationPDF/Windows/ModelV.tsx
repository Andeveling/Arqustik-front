import { WindowI } from '@models/WindowPVC.model';

const ModelV = ({ width, height }: { width: WindowI['width']; height: WindowI['height'] }) => {
  return (
    <div className='flex justify-center items-center h-44 w-44 print:h-52 print:w-52 border border-gray-700 bg-white'>
      <div className='grid grid-cols-1 border border-gray-700 ' style={{ height: '92%', width: '92%' }}>
        <div>
          <div className='h-full bg-blue-400 border-8'>
            <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'>
              <div className='flex justify-center w-6 h-2 border border-gray-700 bg-white self-end justify-self-end  rounded-lg -mb-2'>
                <div className='w-2 h-8 border border-gray-700 bg-white self-center rounded-lg relative -top-3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModelV;
