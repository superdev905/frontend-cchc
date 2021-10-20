const COLORS = [
  '#BE52F2',
  '#00C48C',
  '#0084F4',
  '#FF6474',
  '#6979F8',
  '#FFA26B'
]

const generateColor = () =>
  COLORS[Math.floor(Math.random() * (COLORS.length - 1))]

export default generateColor
