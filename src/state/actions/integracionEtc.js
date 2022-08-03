import Axios from '../../Axios'
import config from '../../config'

const getInformeCursos = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.integracion_etc}/etc-report/cursos`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getInformeEmpresas = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.integracion_etc}/etc-report/empresas`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getInformeLibroClases = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.integracion_etc}/etc-report/libro-clases`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getInformeParticipantes = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.integracion_etc}/etc-report/participantes`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const informeCsocialActions = {
  getInformeCursos,
  getInformeEmpresas,
  getInformeLibroClases,
  getInformeParticipantes
}

export default informeCsocialActions
