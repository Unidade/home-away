import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
      <Analytics />
    </>
  )
}

export default MyApp
