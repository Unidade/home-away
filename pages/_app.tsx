import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'

import type { AppProps } from 'next/app'
import { ModalProvider } from 'context/modalContext'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <AuthProvider session={session}>
        <ModalProvider>
          <Component {...pageProps} />
          <Toaster />
        </ModalProvider>
      </AuthProvider>
      <Analytics />
    </>
  )
}

export default MyApp
