import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavItemProps = {
  href: string
  text: string
}

const NextLink = ({ href, text }: NavItemProps) => {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link
      href={href}
      className={cn(
        isActive ? 'font-extrabold' : 'font-semibold',
        'text-lg flex content-center md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100  transition-all',
      )}>
      <span className='capsize flex content-center'>{text}</span>
    </Link>
  )
}
export default NextLink
