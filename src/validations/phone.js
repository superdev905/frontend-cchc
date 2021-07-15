const phoneValidator = (phone) => {
  if (!phone) {
    return true
  }
  const regex = /^\+?[56]{2}?\s?[9]?\s?[0-9]{8}|[9]?\s?[0-9]{8}$/
  return regex.test(phone)
}

export default phoneValidator
