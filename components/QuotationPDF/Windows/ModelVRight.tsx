import { WindowI } from '@models/WindowPVC.model'

const ModelVRight = ({ width, height }: { width: WindowI['width']; height: WindowI['height'] }) => {
  return (
    <div className='flex justify-center items-center h-44 w-24 print:h-52 print:w-52 border border-gray-700 bg-white'>
      <div
        className='flex justify-center items-center border border-gray-700 bg-white'
        style={{ height: '94%', width: '90%' }}>
        <div className='grid grid-cols-2 border border-gray-700 bg-blue-400 ' style={{ height: '94%', width: '90%' }}>
          <div className='col-span-1 w-2 h-6 border border-gray-700 bg-white self-center justify-self-start -ml-1 rounded-lg'>
            <div className='w-6 h-2 border border-gray-700 bg-white self-center justify-self-end rounded-lg relative top-2'></div>
          </div>

          <div className='col-span-1 grid grid-cols-1 grid-rows-3 justify-items-end'>
            <div className='w-3 h-2 border border-gray-700 rounded-sm bg-white -mr-3 flex self-center' />
            <div className='w-3 h-2 border border-gray-700 rounded-sm bg-white -mr-3 flex self-center' />
            <div className='w-3 h-2 border border-gray-700 rounded-sm bg-white -mr-3 flex self-end' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModelVRight
