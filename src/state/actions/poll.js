import queryString from 'query-string'
import Axios from '../../Axios'
// import pollTypes from '../types/poll'

const pollEndpoint = `${
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5107'
    : 'http://localhost:8000'
}/api/v1`

const getPolls = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/poll?${queryString.stringify(query)}`)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
const createPoll = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${pollEndpoint}/poll`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
        console.log('crear')
      })
      .catch((err) => {
        reject(err.response.data.detail)
        console.log(err)
      })
  })

const updatePoll = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/poll/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

export default {
  getPolls,
  createPoll,
  updatePoll
}
