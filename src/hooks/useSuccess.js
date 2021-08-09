import { useState } from 'react'

const useSuccess = (status = false) => {
  const [success, setSuccess] = useState(status)

  const changeSuccess = (value, callBack) => {
    if (value) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        if (callBack) {
          callBack()
        }
      }, 500)
    } else {
      setSuccess(value)
    }
  }

  return { success, changeSuccess }
}

export default useSuccess
