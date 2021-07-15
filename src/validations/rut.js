const validateRut = (rut) => {
  if (!rut) return false
  // Limpieza de . y -
  // eslint-disable-next-line
  let value = rut.replace(/\./g, '').replace(/\-/g, '')

  // Extracción de dígito cuerpo y verificador
  const body = value.slice(0, -1)

  if (body.length < 7) {
    return false
  }

  // Invertimos el orden de los factores
  const rutReversed = body.trim().split('').reverse()

  // Multiplicación
  let sum = 0
  let multiplier = 2
  // eslint-disable-next-line
  for (let i = 0; i < rutReversed.length; i++) {
    // eslint-disable-next-line
    sum += parseInt(rutReversed[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  // Divide la suma por 11
  const quotient = Math.trunc(sum / 11)
  // Multiplica el cociente por 11
  const product = quotient * 11
  // A sum se le resta product
  const minus = Math.abs(sum - product)
  // Finalmente se obtiene el dígito verificador
  // eslint-disable-next-line
  const checkDigit = 11 - minus < 10 ? 11 - minus : 11 - minus === 11 ? 0 : 'K'

  return checkDigit
}

const rutValidation = (value) => {
  let valid = false
  const dv = validateRut(value)
  if (dv !== false) {
    if (
      dv ===
      // eslint-disable-next-line
      (value.slice(-1).toUpperCase() === 'K' ? 'K' : parseInt(value.slice(-1)))
    ) {
      valid = true
    } else {
      valid = false
    }
  }

  return valid
}

export default rutValidation
