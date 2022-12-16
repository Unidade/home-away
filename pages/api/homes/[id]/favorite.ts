import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'lib/prisma'

const UNAUTHENTICATED = 401

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

  // Retrieve home ID from request path parameter
  const { id } = req.query
  if (req.method === 'PUT') {
    try {
      // Add home to user's favorites
      await prisma.home.update({
        where: { id: id as string },
        data: {
          favoriteBy: {
            connect: { id: session.user.id },
          },
        },
      })
      res
        .status(200)
        .json({ message: "Successfully added home to user's favorites" })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: 'Unable to add home to favorites' })
    }
  }
  // Remove home from user's favorites
  else if (req.method === 'DELETE') {
    try {
      await prisma.home.update({
        where: { id: id as string },
        data: {
          favoriteBy: {
            disconnect: { id: session.user.id },
          },
        },
      })
      res
        .status(200)
        .json({ message: "Successfully removed home from user's favorites" })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: "Unable to remove home of user's favorites" })
    }
  }
  // Return error if request method is not PUT or DELETE
  // Status 405 Method Not Allowed
  else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}
