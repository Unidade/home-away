import { PrismaClient } from '@prisma/client'
import { DefaultUser } from 'next-auth'
import { getSession } from 'next-auth/react'
import { DeepNonNullable } from '../../types/deepNonNullable'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  // If no session exists, return 400 status code unauthorized
  if (!session) {
    return res.status(400).json({ message: 'Unauthorized' })
  }
  const sessionUser = session.user as DeepNonNullable<DefaultUser>
  if (req.method === 'POST') {
    try {
      const { image, title, description, price, guests, beds, baths } = req.body

      // Find the user
      const user = await prisma.user.findUnique({
        where: { email: sessionUser.email },
      })

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const home = await prisma.home.create({
        data: {
          image,
          title,
          description,
          price,
          guests,
          beds,
          baths,
          ownerId: user.id,
        },
      })
      res.status(200).json(home)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: `Something went wrong ${
          error instanceof Error && error.message
        }`,
      })
    }
  }
}
