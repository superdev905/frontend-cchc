import queryString from 'query-string'
import Axios from '../../Axios'
import pollTypes from '../types/poll'
import config from '../../config'

const getPolls =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.poll}/polls?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({ type: pollTypes.GET_POLLS, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createPoll = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.poll}/polls`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
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
