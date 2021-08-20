import validator from 'validator'
import { clean, validate } from 'rut.js'
import formatRut from './rut'

const formatShortRut = (rutString) => {
  if (!rutString) return ''
  return (
    rutString
      .trim()
      .split('')
      .reverse()
      //  eslint-disable-next-line
      .reduce((a, b, i) => (a = i % 3 === 0 ? `${b}.${a}` : `${b}${a}`))
  )
}

const searchWithRut = (value) => {
  let searchFormatted = ''

  const cleanedValue = clean(value)
  const isRut = validate(cleanedValue)

  if (validator.isInt(cleanedValue) || isRut) {
    searchFormatted =
      cleanedValue.length > 4 ? formatRut(value) : formatShortRut(cleanedValue)
  } else {
    searchFormatted = value
  }
  return searchFormatted
}

export default searchWithRut
