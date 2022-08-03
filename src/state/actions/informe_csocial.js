import Axios from '../../Axios'
import config from '../../config'

const getInformeCsocial = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.informe_csocial}/view`, values)
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
