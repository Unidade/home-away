import { decode } from 'base64-arraybuffer'
import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import checkEnv from '../../utils/getEnv'
import { supabase } from '../../lib/supabase'
// create supabase client

// Upload image to Supabase
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let { image } = await req.body
    console.log(image)
    if (!image) {
      return res.status(500).json({ message: 'No image provided' })
    }

    try {
      const contentType = image.match(/data:(.*);base64/)?.[1]
      const base64FileData = image.split('base64,')?.[1]

      // Image needs to be base64
      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: 'Image data not valid' })
      }

      // Create unique filename
      const fileName = nanoid()
      const ext = contentType.split('/')[1]
      const path = `${fileName}.${ext}`
      const bucket = checkEnv(process.env.SUPABASE_BUCKET)

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        })

      if (uploadError) {
        console.log(uploadError)
        throw new Error('Unable to upload image to storage')
      }

      // Construct public URL
      const url = `${checkEnv(process.env.SUPABASE_URL).replace(
        '.co',
        '.in'
      )}/storage/v1/object/public/${bucket}/${data.path}`

      return res.status(200).json({ url })
    } catch (error) {
      console.error(error)
      console.log(error)
      res.status(500).json({ message: `Something went wrong ${error}` })
    }
  }
  // HTTP method not supported
  else {
    res.setHeader('Allow', ['POST'])
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}

// Change the default body size limit from 1mb -> 10mb
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
