import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='HomeAway is a fullstack Airbn-like web application, build with NextJS, NextAuth, TailwindCSS Prisma and Supabase'
        />
        <meta
          name='title'
          content='Fullstack App with Next.js, NextAuth, Supabase & Prisma'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='canonical' href='https://home-away.ninja' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
