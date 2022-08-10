import Axios from '../../Axios'
import config from '../../config'

const getInformeConvenio = () => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.informe_convenio}/convenio/informe-agreements`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getInformeAnexoConvenio = (value) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.informe_convenio}/convenio/informe-anexos-convenio`,
      value
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const informeConvenioActions = {
  getInformeConvenio,
  getInformeAnexoConvenio
}

export default informeConvenioActions
