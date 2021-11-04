import queryString from 'query-string'
import Axios from '../../Axios'
import assistanceTypes from '../types/assistance'
import config from '../../config'

const toggleModal = (value) => (dispatch) =>
  dispatch({ type: assistanceTypes.ASSISTANCE_TYPE_TOGGLE, payload: !value })

const createEvent = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.assistance}/visits`, values)
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
        `${config.services.assistance}/visits/calendar?${queryString.stringify(
          query
        )}`
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
      Axios.get(
        `${config.services.assistance}/visits?${queryString.stringify(query)}`
      )
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
    Axios.get(`${config.services.assistance}/visits/${idEvent}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: assistanceTypes.GET_VISIT_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getVisitStatistics = (idVisit) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.assistance}/visits/${idVisit}/statistics`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createVisitReport = (idVisit, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.assistance}/visits/${idVisit}/report`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateVisitReport = (idVisit, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.assistance}/visits/${idVisit}/report`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEvent = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.assistance}/visits/${id}`, values)
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
    Axios.patch(`${config.services.assistance}/visits/${idEvent}`, values)
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
    Axios.delete(`${config.services.assistance}/visits/${idEvent}`)
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
    Axios.post(`${config.services.assistance}/assistance-construction`, values)
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
        `${
          config.services.assistance
        }/assistance-construction?${queryString.stringify(query)}`
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
    Axios.put(
      `${config.services.assistance}/assistance-construction/${id}`,
      values
    )
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
    Axios.delete(`${config.services.assistance}/assistance-construction/${id}`)
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
    Axios.post(`${config.services.assistance}/assistance`, values)
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
      Axios.get(
        `${config.services.assistance}/assistance?${queryString.stringify(
          query
        )}`
      )
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
        `${
          config.services.assistance
        }/assistance/search?${queryString.stringify(query)}`
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
    Axios.get(`${config.services.assistance}/assistance/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: assistanceTypes.GET_PERSONAL_INTERVENTION_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getAttention =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.assistance
        }/assistance/attended?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
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
  getPersonalInterventionDetails,
  getAttention,
  getVisitStatistics,
  createVisitReport,
  updateVisitReport
}
