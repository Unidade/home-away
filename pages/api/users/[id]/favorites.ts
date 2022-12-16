import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  // Check if user is authenticated
  if (!session?.user) {
    return res.status(401).json({
      message: 'The request lacks valid authentication credentials ',
    })
  }
  const { id } = req.query
  // Check if the user logged is the same as the user in the request parameters
  if (id !== session.user.id) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      // Retrieve home ID from request body
      const favorite = await prisma.user.findMany({
        where: { id: id },
        select: {
          favoriteHomes: true,
        },
      })
      // Return favoritesHomes array empty or not
      const favoriteHomes =
        favorite.length === 0 ? favorite : favorite[0].favoriteHomes
      res.status(200).json(favoriteHomes)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  // Unsupported method
  else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Unsupported method: ${req.method}` })
  }
}
