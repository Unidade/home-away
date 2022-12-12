import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider as AuthProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </>
  )
}

export default MyApp
