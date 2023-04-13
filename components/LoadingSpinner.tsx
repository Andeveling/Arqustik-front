import { Spinner } from 'flowbite-react';

export default function LoadingSpinner() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner size='xl' color='warning' />
    </div>
  );
}
