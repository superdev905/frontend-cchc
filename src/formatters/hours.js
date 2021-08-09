const formatHours = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString()
}

export default formatHours
