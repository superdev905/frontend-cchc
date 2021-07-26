const formatDate = (
  date,
  style = {
    dateStyle: 'long'
  }
) => new Date(date).toLocaleDateString('es-CL', style)

export default formatDate
