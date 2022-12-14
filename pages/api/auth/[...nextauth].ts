import NextAuth, { User } from 'next-auth'
import EmailProvider, {
  SendVerificationRequestParams,
} from 'next-auth/providers/email'
import Handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'
import path from 'path'
import { readFileSync } from 'fs'
import checkEnv from 'utils/getEnv'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

// Instantiate Prisma Client
const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  host: checkEnv(process.env.EMAIL_SERVER_HOST),
  port: Number(checkEnv(process.env.EMAIL_SERVER_PORT)), // need to be a number not a string
  auth: {
    user: checkEnv(process.env.EMAIL_SERVER_USER),
    pass: checkEnv(process.env.EMAIL_SERVER_PASSWORD),
  },
  secure: true,
} as SMTPTransport.Options) // Explicity exposes the required interface overriding the default Transport<T> | TransportOptions checking

const emailsDir = path.resolve(process.cwd(), 'emails')

const sendVerificationRequest = ({
  identifier,
  url,
}: Pick<SendVerificationRequestParams, 'identifier' | 'url'>) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  })
  const emailTemplate = Handlebars.compile(emailFile)
  transporter.sendMail({
    from: `"✨ SupaVacation" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Your sign-in link for SupaVacation',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  })
}

const sendWelcomeEmail = async ({ user }: { user: User }) => {
  const { email } = user

  try {
    const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
      encoding: 'utf8',
    })
    const emailTemplate = Handlebars.compile(emailFile)
    await transporter.sendMail({
      from: `"✨ SupaVacation" ${process.env.EMAIL_FROM}`,
      to: email as string,
      subject: 'Welcome to SupaVacation',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_url: `${process.env.NEXTAUTH_URL}/support`,
      }),
    })
  } catch (error) {
    console.log(`❌ Error sending welcome email to ${user.email}`, error)
  }
}

export default NextAuth({
  // Specify URLs to be used if you want to create custom sign in, sign out and error pages. Pages specified will override the corresponding built-in page.
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
  },
  providers: [
    GoogleProvider({
      clientId: checkEnv(process.env.GOOGLE_ID),
      clientSecret: checkEnv(process.env.GOOGLE_SECRET),
    }),
    EmailProvider({
      sendVerificationRequest,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
    }),
  ],
  adapter: PrismaAdapter(prisma),
  events: { createUser: sendWelcomeEmail }, // When user is created, send welcome email
  callbacks: {
    async session({ session, user }) {
      // Add the user's ID to the session
      session.user.id = user.id
      return session
    },
  },
})
