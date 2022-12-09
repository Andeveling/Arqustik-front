import { ArrowRightIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/solid"
import { WindowI } from "@models/WindowPVC.model"
const ModelXXX = ({ width, height }: { width: WindowI["width"]; height: WindowI["height"] }) => {
  return (
    <div className='flex justify-center items-center h-44 w-56 print:h-52 print:w-52  border border-gray-900 bg-white text-gray-0'>
      <div className='grid grid-cols-3 border border-gray-900' style={{ height: "96%", width: "96%" }}>
        <div className='border-r border-gray-700'>
          <div className='h-full bg-red-400 border-y-4 border-r-4'>
            <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'>
              <ArrowsRightLeftIcon className='h-8 w-8 text-gray-0' />
            </div>
          </div>
        </div>

        <div className='border-r border-gray-700'>
          <div className='h-full bg-red-400 border-y-4 border-r-4'>
            <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'>
              <ArrowsRightLeftIcon className='h-8 w-8 text-gray-0' />
            </div>
          </div>
        </div>

        <div className='h-full bg-red-400 border-y-4 border-r-4'>
          <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'>
            <ArrowsRightLeftIcon className='h-8 w-8 text-gray-0' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModelXXX
