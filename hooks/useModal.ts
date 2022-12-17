import { modalContext } from 'context/modalContext'
import { useContext } from 'react'

export const useModal = () => {
  const modalStates = useContext(modalContext)

  return { ...modalStates }
}
