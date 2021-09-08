import Axios from '../../Axios'
import config from '../../config'

const getFile = (fileKey) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.employee}/file/${fileKey}`, {
      responseType: 'blob'
    })
      .then((response) => {
        const { data } = response
        const type = response.headers['content-type']
        resolve({ blob: new Blob([data], { type, encoding: 'UTF-8' }), type })
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const uploadFile = (formData) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/file/`, formData)
      .then((response) => {
        const { data } = response

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const uploadFileToStorage = (formData) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.parameters}/file/upload`, formData)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  uploadFile,
  getFile,
  uploadFileToStorage
}
