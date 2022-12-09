import { ArrowLeftIcon, BuildingOffice2Icon, Cog6ToothIcon, WrenchIcon } from "@heroicons/react/24/outline"
import { Avatar, Dropdown } from "flowbite-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function QuoterMenu() {
  const { data: session, status } = useSession()
  if (status === "loading") return null
  if (session) {
    return (
      <Dropdown
        arrowIcon={false}
        placement='bottom'
        label={<Avatar alt='User settings' bordered={true} status='online' />}
        inline>
        <Dropdown.Header>
          <span className='block text-sm text-blue-500 font-bold'>{session.user?.username}</span>
        </Dropdown.Header>
        <Dropdown.Item icon={WrenchIcon}>
          <Link href='/private/quoter'>Cotizador V-1.0</Link>
        </Dropdown.Item>
        <Dropdown.Item icon={BuildingOffice2Icon}>
          <Link href='/private/systems'>Sistemas PVC</Link>
        </Dropdown.Item>
        <Dropdown.Item icon={Cog6ToothIcon}>Configuraciones</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon={ArrowLeftIcon} onClick={() => signOut()}>
          <span className='text-sm font-bold text-red-500'>Logout</span>
        </Dropdown.Item>
      </Dropdown>
    )
  } else {
    return null
  }
}
