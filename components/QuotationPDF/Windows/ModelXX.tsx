import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { WindowI } from '@models/WindowPVC.model';

const ModelXX = ({ width, height }: { width: WindowI['width']; height: WindowI['height'] }) => {
  return (
    <div className='flex justify-center items-center h-44 w-44 print:h-52 print:w-52  border border-gray-700 bg-white'>
      <div className='grid grid-cols-2 border border-gray-700 ' style={{ height: '96%', width: '96%' }}>
        <div className='border-r border-gray-700'>
          <div className='h-full bg-blue-400 border-4'>
            <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'>
              <ArrowLeftIcon className='h-8 w-8 text-gray-0' />
            </div>
          </div>
        </div>
        <div className='h-full bg-red-400 border-y-4 border-r-4'>
          <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'>
            <ArrowRightIcon className='h-8 w-8 text-gray-0' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModelXX;
