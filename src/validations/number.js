const validNumber = (num) => {
  if (num === '') return ''
  if (Number.isNaN(num)) return ''
  if (num * 1 < 0) return ''
  if (num === '0') return 0
  return parseInt(num, 10)
}

export default validNumber
