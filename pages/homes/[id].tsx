import Image from 'next/image'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

import { IHome } from '../../types/home'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { prisma } from '../../lib/prisma'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

/**
 * Individual page for each home
 * @param home
 * @returns
 */
export default function ListedHome(home: IHome | null) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOwner, setIsOwner] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const deleteHome = async () => {
    let toastId
    try {
      toastId = toast.loading('Deleting home...')
      setDeleting(true)
      await axios.delete(`/api/homes/${home?.id}`)
      toast.success('Home deleted', { id: toastId })
      router.push('/homes')
    } catch (error) {
      console.log(error)
      toast.error('Unable to delete home', { id: toastId })
      setDeleting(false)
    }
  }

  useEffect(() => {
    ;async () => {
      // check if the user is the owner of the home
      try {
        if (session?.user && home?.ownerId) {
          const ownerId = await (
            await axios.get(`/api/homes/${home.id}/ownerId`)
          ).data
          console.log('ownerId: ', ownerId)
          // if the user is the home owner, set isOwner to true
          setIsOwner(ownerId === home?.ownerId)
        }
      } catch (error) {
        console.error(error)
        setIsOwner(false)
      }
    }

    return () => {}
  }, [isOwner, session?.user, home?.ownerId])

  if (router.isFallback) {
    return 'Loading'
  }
  return (
    <Layout>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4'>
          <div>
            <h1 className='text-2xl font-semibold truncate'>
              {home?.title ?? ''}
            </h1>
            <ol className='inline-flex items-center space-x-1 text-gray-500'>
              <li>
                <span>{home?.guests ?? 0} guests</span>
                <span aria-hidden='true'> · </span>
              </li>
              <li>
                <span>{home?.beds ?? 0} beds</span>
                <span aria-hidden='true'> · </span>
              </li>
              <li>
                <span>{home?.baths ?? 0} baths</span>
                <span aria-hidden='true'> · </span>
              </li>
            </ol>
          </div>
          {isOwner ? (
            <div className='flex items-center space-x-2'>
              <button
                type='button'
                disabled={deleting}
                onClick={() => router.push(`/homes/${home?.id}/edit`)}
                className='px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Edit
              </button>

              <button
                type='button'
                disabled={deleting}
                onClick={deleteHome}
                className='rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none transition disabled:bg-rose-500 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ) : null}
        </div>

        <div className='mt-6 relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg shadow-md overflow-hidden'>
          {home?.image ? (
            <Image
              priority
              src={home.image}
              alt={home.title}
              fill
              className='object-cover'
            />
          ) : null}
        </div>
        <p className='mt-8 text-lg'>{home?.description ?? ''}</p>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const homes = await prisma.home.findMany({
    select: { id: true },
  })

  return {
    paths: homes.map((home: IHome) => ({
      params: { id: home.id },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }: Params) {
  const home = await prisma.home.findUnique({
    where: { id: params.id },
  })

  if (home) {
    return {
      props: JSON.parse(JSON.stringify(home)),
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
