import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

import type { NextPageContext } from 'next'
import { IHome } from '../../types/home'

const prisma = new PrismaClient()

export default function ListedHome(home: IHome | null) {
  const router = useRouter()

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
    paths: homes.map((home) => ({
      params: { id: home.id },
    })),
    fallback: true,
  }
}

interface NextPageContextWithParams extends NextPageContext {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: NextPageContextWithParams) {
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
