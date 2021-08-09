import queryString from 'query-string'
import Axios from '../../Axios'
import assistanceTypes from '../types/assistance'

const serviceEndpoint = `${
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:8000'
    : 'http://localhost:5100'
}/api/v1`

const createEvent = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${serviceEndpoint}/assistance-visits`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEvents =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${serviceEndpoint}/assistance-visits?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: assistanceTypes.GET_EVENTS, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const updateEvent = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${serviceEndpoint}/assistance-visits/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchEvent = (idEvent, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${serviceEndpoint}/assistance-visits/${idEvent}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteEvent = (idEvent) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${serviceEndpoint}/assistance-visits/${idEvent}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  patchEvent
}
