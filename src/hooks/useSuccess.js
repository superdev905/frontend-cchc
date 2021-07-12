import { useState } from 'react'

const useSuccess = (status = false) => {
  const [success, setSuccess] = useState(status)

  const changeSuccess = (value) => {
    if (value) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1000)
    } else {
      setSuccess(value)
    }
  }

  return { success, changeSuccess }
}

export default useSuccess
