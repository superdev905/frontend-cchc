import { useState } from 'react'

const useToggle = (status = false) => {
  const [open, setOpen] = useState(status)

  const toggleOpen = () => {
    setOpen((prevState) => !prevState)
  }

  return { open, toggleOpen }
}

export default useToggle
