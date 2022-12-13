import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { IHome } from '../../types/home'
import { supabase } from '../../lib/supabase'
// 401 -> Authentication errors
// 403 -> Authorization errors
// Reference:   https://www.rfc-editor.org/rfc/rfc9110#status.401

const METHOD_NOT_ALLOWED = 405
const UNAUTHENTICATED = 401
const UNAUTHORIZED = 403
const SERVER_ERROR = 500

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req })
    if (!session?.user) {
      return res.status(UNAUTHENTICATED).json({
        message: 'The request lacks valid authentication credentials ',
      })
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { listedHomes: true },
    })
    const { id } = req.query
    if (!user?.listedHomes.find((home: IHome) => home.id === id)) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'You are not authorized to access this resource' })
    }
    // Update home
    if (req.method === 'PATCH') {
      const home = await prisma.home.update({
        where: { id } as { id: string },
        data: req.body,
      })
      res.status(200).json({ home })
    }
    // Delete home
    else if (req.method === 'DELETE') {
      const home: IHome | null = await prisma.home.delete({
        where: { id } as { id: string },
      })
      if (home?.image) {
        const path = home.image.split('/').pop()
        console.log(
          'delete image from supabase:',
          await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .remove([path as string])
        )
      }
      res.status(200).json({ home })
    }
    // Unsupported method
    else {
      res.setHeader('Allow', ['PATCH', 'DELETE'])
      res.status(METHOD_NOT_ALLOWED).json({ message: 'Unsupported method' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(SERVER_ERROR)
      .json({ message: 'The server was not able to process your request' })
  }
}
