import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

export const modalContext = createContext<ModalContextType | null>(null)

function useModalContextValue() {
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      showModal,
      setShowModal
    }),
    [openModal, closeModal, showModal, setShowModal]
  )

  return value
}

type ModalContextType = ReturnType<typeof useModalContextValue>

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <modalContext.Provider value={useModalContextValue()}>
      {children}
    </modalContext.Provider>
  )
}

export const useModal = () => {
  const modalStates = useContext(modalContext)
  if (!modalStates) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return { ...modalStates }
}
