/* eslint-disable */

/**
 * Format rut to XX.XXX.XXX-X
 * @param {String} rut
 * @returns
 */

const formatRut = (value) => {
  let newValue = null
  let cleanRut = value.replace(/\./g, '').replace(/\-/g, '')
  let body = cleanRut.slice(0, -1)
  let checker = cleanRut.slice(-1).toUpperCase()

  if (body.length > 0) {
    let rutFormatted = ''
    for (let j = 1, i = body.length - 1; i >= 0; i--, j++) {
      let number = body.charAt(i)
      rutFormatted = number + rutFormatted
      if (j % 3 === 0 && j <= body.length - 1) {
        rutFormatted = '.' + rutFormatted
      }
    }
    newValue = `${rutFormatted}-${checker}`
  } else {
    newValue = value
  }
  return newValue
}
export default formatRut
