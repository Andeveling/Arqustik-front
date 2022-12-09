import { useSession, signIn, signOut } from "next-auth/react"
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid"
import { Menu } from "@headlessui/react"
import { Avatar, Button, Dropdown } from "flowbite-react"
import { HomeIcon, WrenchIcon, Cog6ToothIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"
import QuoterMenu from "./QuoterMenu"

export default function TopArea() {
  const { data: session, status } = useSession()
  if (status === "loading") return null
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

/* 

<button
        onClick={() => signOut()}
        className='hover:border-gray-500  font-bold py-2 px-4 rounded-full text-red-500 inline-flex items-center space-x-2'>
        <ArrowLeftOnRectangleIcon className='h-5 w-5' />
        <span>Sign Out</span>
      </button>


      <button
        onClick={() => signIn()}
        className='hover:border-gray-500  font-bold py-2 px-4 rounded-full text-green-500 inline-flex items-center space-x-2'>
        <ArrowRightOnRectangleIcon className='h-5 w-5' />
        <span>Sign In</span>
      </button>

*/
