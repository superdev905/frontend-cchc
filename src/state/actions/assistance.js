import queryString from 'query-string'
import Axios from '../../Axios'
import assistanceTypes from '../types/assistance'

const serviceEndpoint = `${
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5101'
    : 'http://localhost:5100'
}/api/v1`

const toggleModal = (value) => (dispatch) =>
  dispatch({ type: assistanceTypes.ASSISTANCE_TYPE_TOGGLE, payload: !value })

const createEvent = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${serviceEndpoint}/visits`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getCalendarEvents =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${serviceEndpoint}/visits/calendar?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: assistanceTypes.GET_CALENDAR_EVENTS, payload: data })
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
      Axios.get(`${serviceEndpoint}/visits?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({
            type: assistanceTypes.GET_EVENTS_LIST,
            payload: data.items
          })
          dispatch({
            type: assistanceTypes.SET_EVENTS_TOTALS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getEventDetails = (idEvent) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${serviceEndpoint}/visits/${idEvent}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: assistanceTypes.GET_VISIT_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEvent = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${serviceEndpoint}/visits/${id}`, values)
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
    Axios.patch(`${serviceEndpoint}/visits/${idEvent}`, values)
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
    Axios.delete(`${serviceEndpoint}/visits/${idEvent}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createConstructionAttention = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${serviceEndpoint}/assistance-construction`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getConstructionAttention =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${serviceEndpoint}/assistance-construction?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: assistanceTypes.GET_ASSISTANCE_CONSTRUCTION,
            payload: data
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const updateConstructionAttention = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${serviceEndpoint}/assistance-construction/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const deleteConstructionAttention = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${serviceEndpoint}/assistance-construction/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const createAssistance = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${serviceEndpoint}/assistance`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getAssistanceList =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${serviceEndpoint}/assistance?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({
            type: assistanceTypes.GET_ATTENDED_EMPLOYEES,
            payload: data.items
          })
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const searchEmployee =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${serviceEndpoint}/assistance/search?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })
const getPersonalInterventionDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${serviceEndpoint}/assistance/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: assistanceTypes.GET_PERSONAL_INTERVENTION_DETAILS,
          payload: data
        })
        resolve(data)
        console.log(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  toggleModal,
  getCalendarEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  patchEvent,
  getEvents,
  getEventDetails,
  createConstructionAttention,
  getConstructionAttention,
  updateConstructionAttention,
  deleteConstructionAttention,
  createAssistance,
  getAssistanceList,
  searchEmployee,
  getPersonalInterventionDetails
}
