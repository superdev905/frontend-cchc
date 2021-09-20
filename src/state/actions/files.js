import Axios from 'axios'
import config from '../../config'

const downloadFile = (fileUrl) => () =>
  new Promise((resolve, reject) => {
    const extension = fileUrl.split('.').pop()
    const fileName = fileUrl.split('/').pop()
    const instance = Axios.create()
    delete instance.defaults.headers.common.Authorization
    Axios.get(fileUrl, {
      responseType: 'blob'
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}.${extension}`)
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

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
    Axios.post(`${config.services.parameters}/file/upload`, formData)
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
  uploadFileToStorage,
  downloadFile
}
