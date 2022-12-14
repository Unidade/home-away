// Augment the NextAuth types to include the user id
// See tread: https://github.com/nextauthjs/next-auth/issues/671#issuecomment-830275305
// solution -> https://next-auth.js.org/getting-started/typescript#module-augmentation

import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Extends DefaultSession user */
      id: string // user.id
    } & DefaultSession['user']
  }
}
