import axios from 'axios'
import Axios from '../../Axios'
import config from '../../config'

const downloadFile = (fileUrl, originalFileName) => () =>
  new Promise((resolve, reject) => {
    const fileName = originalFileName || fileUrl.split('/').pop()
    const instance = axios.create()
    delete instance.defaults.headers.common.Authorization
    axios
      .get(fileUrl, {
        responseType: 'blob'
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}`)
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

const deleteFile = (key) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.parameters}/file/delete/${key}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const filesActions = {
  uploadFile,
  getFile,
  uploadFileToStorage,
  downloadFile,
  deleteFile
}

export default filesActions
