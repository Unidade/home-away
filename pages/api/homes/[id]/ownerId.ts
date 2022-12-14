import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const owner = await prisma.home.findUnique({
        where: { id: id as string },
        select: { owner: { select: { id: true } } },
      })
      if (owner) {
        res.status(200).json(owner)
      } else {
        throw new Error(`Owner of the home with id:${id} not found`)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Something went wrong ${error}` })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
