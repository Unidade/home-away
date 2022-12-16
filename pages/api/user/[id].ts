// Path: pages\api\user\[id].ts
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  // Retrieve home ID from request path parameter
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      console.log(id)
      let user
      if (session?.user) {
        // Retrieve user's private information if authenticated
        user = await prisma.user.findUnique({
          where: { id: session.user.id },
          include: { favoriteHomes: true, listedHomes: true },
        })
      } else {
        // return public user data
        user = await prisma.user.findUnique({
          where: { id: id as string },
        })
      }
      console.log(user)
      res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: "Unable to retrieve user's information " })
    }
  }
  // Return error if request method is not GET
  else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Unsupported method: ${req.method}` })
  }
}
