import { WindowI } from '@models/WindowPVC.model'

const ModelVLeft = ({ width, height }: { width: WindowI['width']; height: WindowI['height'] }) => {
  return (
    <div className='flex justify-center items-center h-44 w-24 print:h-52 print:w-52 border border-gray-700'>
      <div
        className='flex justify-center items-center border border-gray-700 bg-white'
        style={{ height: '94%', width: '90%' }}>
        <div className='grid grid-cols-2 border border-gray-700 bg-blue-400 ' style={{ height: '94%', width: '90%' }}>
          <div className='col-span-1 grid grid-cols-1 grid-rows-3'>
            <div className='w-3 h-2 border border-gray-700 rounded-sm bg-white -ml-2 flex self-center' />
            <div className='w-3 h-2 border border-gray-700 rounded-sm bg-white -ml-2 flex self-center' />
            <div className='w-3 h-2 border border-gray-700 rounded-sm bg-white -ml-2 flex self-end' />
          </div>
          <div className='w-2 h-6 border border-gray-700 bg-white self-center justify-self-end -mr-1 rounded-lg'>
            <div className='w-6 h-2 border border-gray-700 bg-white self-center justify-self-end rounded-lg relative -left-4 top-2'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModelVLeft
