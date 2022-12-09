import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { Button } from 'flowbite-react'
import { signIn, useSession } from 'next-auth/react'
import QuoterMenu from './QuoterMenu'

export default function TopArea() {
  const { data: session, status } = useSession()
  if (status === 'loading') return null
  if (session) {
    return <QuoterMenu />
  } else {
    return (
      <Button color='dark' onClick={() => signIn()}>
        <ArrowRightOnRectangleIcon className='h-5 w-5 mr-2' /> Sign In
      </Button>
    )
  }
}
