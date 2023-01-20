import Link from 'next/link'
import { PropsWithChildren } from 'react'

interface ExternalLinkProps extends PropsWithChildren {
  href: string
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a
    className='text-gray-200 hover:text-gray-600 font-bold transition'
    target='_blank'
    rel='noopener noreferrer'
    href={href}>
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className='flex flex-col justify-center items-start w-full bg-gray-800 dark:bg-gray-900'>
      <hr className='w-full border-1 border-gray-200 dark:border-gray-800 mb-8' />
      {/*  <NowPlaying /> */}
      <div className='justify-center text-center w-full grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2'>
        <div className='flex flex-col space-y-4'>
          <Link href='/' className='text-gray-200 hover:text-gray-600 font-bold transition'>
            Home
          </Link>
          <Link href='/quote' className='text-gray-200 hover:text-gray-600 font-bold transition'>
            Cotizar
          </Link>
        </div>
        <div className='flex flex-col space-y-4'>
          <ExternalLink href='https://twitter.com'>Twitter</ExternalLink>
          <ExternalLink href='https://github.com'>Facebook</ExternalLink>
          <ExternalLink href='https://linkedin.com'>Linkedin</ExternalLink>
        </div>
      </div>
      <div className='flex flex-col py-5 w-full'>
        <span className='text-sm text-gray-200  sm:text-center'>
          © 2022 <ExternalLink href='https://arqustik.com'>Arqustik Vitruvio SAS™</ExternalLink> All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
