import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function ThemeHandled() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  return (
    <button
      type='button'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='rounded-full bg-gray-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-gray-600'>
      {theme === 'dark' ? (
        <SunIcon className='h-6 w-6 text-orange-400' aria-hidden='true' />
      ) : (
        <MoonIcon className='h-6 w-6 text-blue-700' aria-hidden='true' />
      )}
    </button>
  )
}
