import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSession, signOut } from 'next-auth/react'
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  OfficeBuildingIcon,
  UserIcon,
} from '@heroicons/react/outline'
import AuthModal from './AuthModal'
import { useModal } from 'hooks/useModal'

interface ILayoutProps {
  children?: React.ReactNode
}

const menuItems = [
  {
    label: 'List a new home',
    icon: PlusIcon,
    href: '/create',
  },
  {
    label: 'My homes',
    icon: HomeIcon,
    href: '/homes',
  },
  {
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites',
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    onClick: signOut,
  },
]

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const user = session?.user
  const isLoadingUser = status === 'loading'
  const { showModal, openModal, closeModal } = useModal()
  // const [showModal, setShowModal] = useState(false)

  // const openModal = () => setShowModal(true)
  // const closeModal = () => setShowModal(false)

  return (
    <>
      <Head>
        <title>HomeAway</title>
      </Head>
      <div className='flex min-h-screen flex-col '>
        <header className='sticky top-0 z-10 h-16 w-full bg-white/90 shadow-sm drop-shadow-sm backdrop-blur-md'>
          <div className='container mx-auto h-full'>
            <div className='flex h-full items-center justify-between space-x-4 px-4'>
              <Link className='flex items-center space-x-1' href='/'>
                <OfficeBuildingIcon className='h-8 w-8 shrink-0 text-blue-700/80' />
                <span className='text-xl font-semibold tracking-wide text-gray-800'>
                  Home<span className='text-blue-700'>Away</span>
                </span>
              </Link>
              <div className='flex items-center space-x-4'>
                <button
                  type='button'
                  onClick={() => (user ? router.push('/create') : openModal())}
                  className='hidden rounded-md px-3 py-1 font-medium text-gray-700 transition hover:bg-gray-100 sm:block'
                >
                  List your home
                </button>
                {isLoadingUser ? (
                  <div className='h-8 w-[75px] animate-pulse rounded-md bg-gray-100/70' />
                ) : user ? (
                  <Menu as='div' className='relative z-50'>
                    <Menu.Button className='group flex items-center space-x-px '>
                      <div className='relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border'>
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || 'Avatar'}
                            fill
                          />
                        ) : (
                          <UserIcon className='h-6 w-6 text-gray-400' />
                        )}
                      </div>

                      <ChevronDownIcon className='h-5 w-5 shrink-0 text-gray-500 group-hover:text-current' />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='opacity-0 scale-95'
                      enterTo='opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='opacity-100 scale-100'
                      leaveTo='opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 mt-1 w-72 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='mb-2 flex items-center space-x-2 py-4 px-4'>
                          <div className='relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200'>
                            {user?.image ? (
                              <Image
                                src={user?.image}
                                alt={user?.name || 'Avatar'}
                                fill
                              />
                            ) : (
                              <UserIcon className='h-6 w-6 text-gray-400' />
                            )}
                          </div>
                          <div className='flex flex-col truncate'>
                            <span>{user?.name}</span>
                            <span className='text-sm text-gray-500'>
                              {user?.email}
                            </span>
                          </div>
                        </div>

                        <div className='py-2'>
                          {menuItems.map(
                            ({ label, href, onClick, icon: Icon }) => (
                              <div
                                key={label}
                                className='px-2 last:mt-2 last:border-t last:pt-2'
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link
                                      href={href}
                                      className='flex items-center space-x-2 rounded-md py-2 px-4 hover:bg-gray-100'
                                    >
                                      <Icon className='h-5 w-5 shrink-0 text-gray-500' />
                                      <span>{label}</span>
                                    </Link>
                                  ) : (
                                    <button
                                      className='flex w-full items-center space-x-2 rounded-md py-2 px-4 hover:bg-gray-100'
                                      onClick={async () => {
                                        const data = await signOut({
                                          redirect: false,
                                          callbackUrl: '/',
                                        })
                                        router.push(data.url)
                                      }}
                                    >
                                      <Icon className='h-5 w-5 shrink-0 text-gray-500' />
                                      <span>{label}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    type='button'
                    onClick={openModal}
                    className='ml-4 rounded-md bg-blue-600 px-4 py-1 text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className='container mx-auto flex-grow'>
          <div className='px-4 py-12'>{children}</div>
        </main>

        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  )
}

export default Layout
