import CartItemsContextProvider from '@context/CartContext'
import { PublicAppProvider } from '@context/PublicAppContext'
import { SWRArqustikConfig } from 'arqustik.config'
import { Button } from 'flowbite-react'
import { AxiosInterceptor } from 'interceptors/axios.interceptor'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import '../styles/globals.css'
import WhatsAppButton from '@components/WhatsAppButton'
AxiosInterceptor()
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  return (
    <SessionProvider session={session}>
      <SWRConfig value={SWRArqustikConfig}>
        <CartItemsContextProvider>
          <PublicAppProvider>
            <ThemeProvider attribute='class'>
              <Component {...pageProps} />
              <div>
                <Toaster />
              </div>
              <WhatsAppButton />
            </ThemeProvider>
          </PublicAppProvider>
        </CartItemsContextProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
