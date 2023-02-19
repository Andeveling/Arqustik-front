import { ArrowLeftIcon, BuildingOffice2Icon, Cog6ToothIcon, WrenchIcon, UserIcon } from '@heroicons/react/24/outline'
import { Avatar, Dropdown } from 'flowbite-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { PrivateRoutes } from 'routes'

export default function QuoterMenu() {
  const { data: session, status } = useSession()
  if (status === 'loading') return null
  if (session) {
    return (
      <Dropdown
        arrowIcon={false}
        placement='bottom'
        label={<Avatar alt='User settings' bordered={true} status='online' />}
        aria-labelledby='Vendor Button Options'
        inline>
        <span className='sr-only'>Menu de vendedor</span>
        <Dropdown.Header>
          <span className='block text-sm text-blue-500 font-bold'>{session.user?.username}</span>
        </Dropdown.Header>
        <Dropdown.Item icon={WrenchIcon}>
          <Link href={PrivateRoutes.QUOTER}>Clientes</Link>
        </Dropdown.Item>
        <Dropdown.Item icon={UserIcon}>
          <Link href={PrivateRoutes.INTERESTED}>Interesados</Link>
        </Dropdown.Item>
        <Dropdown.Item icon={BuildingOffice2Icon}>
          <Link href={PrivateRoutes.SYSTEMS}>Sistemas PVC</Link>
        </Dropdown.Item>
        <Dropdown.Item icon={Cog6ToothIcon}>
          <Link href={PrivateRoutes.CONFIG}>Configuraciones</Link>
        </Dropdown.Item>
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
