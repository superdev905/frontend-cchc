const formatCurrency = (stringPrice) =>
  `$ ${stringPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`

export default formatCurrency
