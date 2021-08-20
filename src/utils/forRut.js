import { useState } from 'react'
import { format, clean } from 'rut.js'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const reset = (newFormState = initialState) => {
    setValues(newFormState)
  }

  const handleInputChange = (e) => {
    if (e?.target?.value && e?.target?.value !== 'rut') {
      setValues({
        ...values,
        [e?.target?.value]: e.target.value
      })
    } else if (e?.target?.value === 'rut') {
      let value = e.target.value
      value = clean(value)
      setValues({
        ...values,
        rut: format(value)
      })
    } else {
      setValues({
        ...values,
        income: e.floatValue
      })
    }
  }

  return [values, handleInputChange, reset]
}
