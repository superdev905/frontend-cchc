const formatHours = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default formatHours
