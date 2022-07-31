import Axios from '../../Axios'
import config from '../../config'

const getInformeCsocial = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.informe_csocial}/view`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const informeCsocialActions = {
  getInformeCsocial
}

export default informeCsocialActions
