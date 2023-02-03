import { useCart } from '@context/CartContext'
import { Disclosure, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MenuLinks from './MenuLinks'
import NextLink from './NextLink'
import ThemeHandled from './ThemeHandled'
import TopArea from './TopArea'
import Image from 'next/image'
import logo from '@public/img/logo.png'

const navigation = [
  { name: 'Inicio', href: '/', current: false },
  { name: 'Nosotros', href: '/about', current: false },
  { name: 'Cotizar', href: '/quote', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { count: cartCount } = useCart()
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <header className='min-h-full bg-gray-200 dark:bg-gray-900'>
      <Disclosure as='nav'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <p className='text-4xl font-bold text-gray-500'>Arqustik</p>
                    {/*  <Image src={logo} width={100} alt='logo corporativo' /> */}
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      <MenuLinks />
                    </div>
                  </div>
                </div>

                <div className='flex justify-end flex-row w-full py-10 mr-4 sm:mr-8 gap-4'>
                  <div className='flex justify-end flex-row'>
                    <Link href='/cart' className='flex justify-end flex-row'>
                      <ShoppingBagIcon className='w-10 h-10' />
                    </Link>
                    <div className='bg-red-600 rounded-full p-1 w-6 h-6 flex justify-center items-center -ml-4'>
                      <span className='text-gray-0 font-bold'>{cartCount}</span>
                    </div>
                  </div>
                  <div>
                    <ThemeHandled />
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-4 w-40 items-center  space-x-4 md:ml-6'>{open ? <></> : <TopArea />}</div>
                </div>
                <div className='-mr-2 flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none ring-2 ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Transition
              enter='transition duration-300 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-300 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'>
              <Disclosure.Panel className='md:hidden'>
                <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}>
                      <NextLink href={item.href} text={item.name} />
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <div className='display flex justify-end md:hidden   sm:px-4 pt-1 pb-4 pr-2'>
        <TopArea />
      </div>
    </header>
  )
}
