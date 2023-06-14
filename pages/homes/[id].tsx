import Image from 'next/image'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { prisma } from '../../lib/prisma'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { PencilIcon } from '@heroicons/react/solid'
import { Home } from '@prisma/client'

export default function ListedHome(home: Home) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOwner, setIsOwner] = useState(false)
  const [deleting, setDeleting] = useState(false)

  console.log(session)
  console.log(home)

  const deleteHome = async () => {
    let toastId
    try {
      toastId = toast.loading('Deleting home...')
      setDeleting(true)
      await fetch(`/api/homes/${home?.id}`, { method: 'DELETE' })

      toast.success('Home deleted', { id: toastId })
      router.push('/homes')
    } catch (error) {
      console.log(error)
      toast.error('Unable to delete home', { id: toastId })
      setDeleting(false)
    }
  }

  useEffect(() => {
    if (session?.user && home) {
      setIsOwner(session.user.id === home.ownerId)
    }
  }, [session, home])

  return (
    <Layout>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4'>
          <div>
            <h1 className='truncate text-2xl font-semibold'>
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
                className='rounded-md border border-gray-800 px-4 py-1 text-gray-800 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-800 disabled:opacity-50'
              >
                <PencilIcon />
                Edit
              </button>

              <button
                type='button'
                disabled={deleting}
                onClick={deleteHome}
                className='rounded-md border border-blue-500 px-4 py-1 text-blue-500 transition hover:bg-blue-500 hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-rose-500 disabled:text-white disabled:opacity-50'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ) : null}
        </div>

        <div className='aspect-w-16 aspect-h-9 relative mt-6 overflow-hidden rounded-lg bg-gray-100 shadow-md'>
          {home?.image ? (
            <Image
              sizes=' sizes="(min-width: 1075px) 92vw,
              (min-width: 1200px) 80vw;
              95vw"'
              priority
              src={home.image}
              alt={home.title}
              fill
              className='object-cover'
            />
          ) : null}
        </div>
        <h2 className='mt-4 text-xl font-semibold uppercase tracking-tight'>
          Description
        </h2>
        <p className='mt-2 text-lg'>{home?.description ?? ''}</p>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const homes = await prisma.home.findMany({
    select: { id: true }
  })

  return {
    paths: homes.map((home) => ({
      params: { id: home.id }
    })),
    fallback: true
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const home = await prisma.home.findUnique({
    where: { id: params.id }
  })

  if (home) {
    return {
      props: JSON.parse(JSON.stringify(home))
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}
