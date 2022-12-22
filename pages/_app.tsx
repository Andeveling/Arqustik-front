import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { AxiosInterceptor } from 'interceptors/axios.interceptor'
import { SWRConfig } from 'swr'
import { SWRArqustikConfig } from 'arqustik.config'
import { PublicAppProvider } from 'context/PublicAppContext'

AxiosInterceptor()
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={SWRArqustikConfig}>
        <PublicAppProvider>
          <ThemeProvider attribute='class'>
            <Component {...pageProps} />
            <div>
              <Toaster />
            </div>
          </ThemeProvider>
        </PublicAppProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
