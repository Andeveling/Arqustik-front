import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function ThemeHandled() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <Switch
      checked={theme === 'light'}
      onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-600'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
      <span className='sr-only'>Dark Mode</span>
      <span
        aria-hidden='true'
        className={`${theme === 'dark' ? 'translate-x-9 bg-white' : 'translate-x-0 bg-black'}
              pointer-events-none flex justify-center items-center h-[36px] w-[36px] transform rounded-full  shadow-lg ring-0 transition duration-200 ease-in-out`}>
        {theme === 'dark' ? (
          <>
            <SunIcon className='h-5 w-5 text-black' aria-hidden='true' />
            <span className='sr-only'>Light Mode</span>
          </>
        ) : (
          <>
            <MoonIcon className='h-5 w-5 text-white' aria-hidden='true' />
            <span className='sr-only'>Dark Mode</span>
          </>
        )}
      </span>
    </Switch>
  )
}
