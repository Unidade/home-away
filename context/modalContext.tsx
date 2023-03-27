import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

export const modalContext = createContext<ModalContextType | null>(null)

type ModalContextType = {
  openModal: () => void
  closeModal: () => void
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const { Provider } = modalContext

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
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

  return <Provider value={value}>{children}</Provider>
}

export const useModal = () => {
  const modalStates = useContext(modalContext)
  if (!modalStates) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return { ...modalStates }
}
