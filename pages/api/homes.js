import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const session = await getSession({ req })

  // If no session exists, return 400 status code unathorized
  if (!session) {
    return res.status(400).json({ message: 'Unathorized' })
  }

  if (req.method === 'POST') {
    try {
      const { image, title, description, price, guests, beds, baths } = req.body

      // Find the user
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })

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
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: `Something went wrong ${e.message}` })
    }
  }
}
