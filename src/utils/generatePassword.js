const generatePassword = () =>
  Array(10)
    .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
    .map((x) => x[Math.floor(Math.random() * x.length)])
    .join('')

export default generatePassword
