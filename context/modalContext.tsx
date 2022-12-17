import React, { createContext, useState } from 'react'

export const modalContext = createContext<any>(null)

const { Provider } = modalContext

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <Provider value={{ openModal, showModal, setShowModal, closeModal }}>
      {children}
    </Provider>
  )
}
