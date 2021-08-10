import Axios from '../../Axios'

const employeeEndpoint = `${
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5104'
    : 'http://localhost:8000'
}/api/v1`

const getFile = (fileKey) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/file/${fileKey}`, { responseType: 'blob' })
      .then((response) => {
        const { data } = response
        const type = response.headers['content-type']
        resolve({ blob: new Blob([data], { type, encoding: 'UTF-8' }), type })
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  getFile
}
