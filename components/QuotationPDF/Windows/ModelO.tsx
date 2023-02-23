import { WindowI } from '@models/WindowPVC.model'

const ModelO = ({ width, height }: { width: WindowI['width']; height: WindowI['height'] }) => {
  return (
    <div className='flex justify-center items-center h-44 w-44 print:h-52 print:w-52 border border-gray-700 bg-white'>
      <div className='grid grid-cols-1 border border-gray-700  bg-white' style={{ height: '96%', width: '96%' }}>
        <div>
          <div className='h-full bg-blue-400 border-4'>
            <div className='bg-blue-400 h-full border border-gray-700 flex justify-center items-center'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModelO
