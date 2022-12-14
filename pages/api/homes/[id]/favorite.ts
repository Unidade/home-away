import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'lib/prisma'

const UNAUTHENTICATED = 401
const UNAUTHORIZED = 403

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session?.user) {
    return res.status(UNAUTHENTICATED).json({
      message: 'The request lacks valid authentication credentials ',
    })
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: { id: true },
  })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const { id } = req.query
}
