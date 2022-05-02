import { saveAs } from 'file-saver'
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

const cleanCalendarEvents = () => (dispatch) =>
  dispatch({ type: assistanceTypes.GET_CALENDAR_EVENTS, payload: [] })

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
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.assistance}/visits?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: assistanceTypes.GET_EVENTS_LIST,
              payload: data.items
            })
            dispatch({
              type: assistanceTypes.SET_EVENTS_TOTALS,
              payload: data.total
            })
          }
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
const getVisitReportItems = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.assistance}/visits/${id}/report-items`)
      .then((response) => {
        const { data } = response
        dispatch({ type: assistanceTypes.GET_ITEMS, payload: data })
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

const getReportItems = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.assistance}/visits-report-items`)
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

const setWorkersQuantity = (idVisit, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/visits/${idVisit}/workers`,
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

const requestVisitClose = (idVisit) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.assistance}/visits/${idVisit}/request-close`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getVisitsToClose = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.assistance
      }/visits/request-close?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const closeVisit = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.assistance}/visits/${id}/close`, values)
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
          const result = []
          data?.forEach((item) =>
            item.forEach((attended) => {
              result.push({
                id: attended[0],
                run: attended[1],
                fullName: `${attended[2]} ${attended[3]}`,
                atention: attended[4],
                tag: 'A',
                S: 0,
                IN: 0,
                FN: 0,
                D: 0,
                F: 0,
                E: 0,
                L: 0,
                FR: 0,
                AI: 0,
                AG: 0,
                P: 0,
                V: 0,
                PS: 0,
                B: 0,
                constructionId: attended[5]
              })
            })
          )
          dispatch({
            type: assistanceTypes.GET_ATTENDED_EMPLOYEES,
            payload: result
          })
          resolve(data)
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

const getAttentionDetails = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.assistance}/assistance/${id}`)
      .then((response) => {
        const { data } = response
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

const exportVisits = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.assistance}/visits/export`, values, {
      responseType: 'arraybuffer'
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Visitas-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
const exportEmployeesToAttend = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/visits/${id}/attended-employees/export`,
      null,
      {
        responseType: 'arraybuffer'
      }
    )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Trabajadores-por-atender`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getAttendedEmployeeByBusiness =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.assistance
        }/assistance/business?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getEmployeesToAttend =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.socialCase
        }/social-cases/employee?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: assistanceTypes.GET_EMPLOYEES_TO_ATTEND,
            payload: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getCalendarStats =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.assistance
        }/visits/calendar/stats?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: assistanceTypes.GET_CALENDAR_STATS,
            payload: data
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const totalUsers = (data) => (dispatch) =>
  dispatch({
    type: assistanceTypes.TOTAL_USERS,
    payload: data
  })

const assistanceActions = {
  toggleModal,
  getCalendarEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  patchEvent,
  setWorkersQuantity,
  requestVisitClose,
  getVisitsToClose,
  closeVisit,
  getEvents,
  getEventDetails,
  createConstructionAttention,
  getConstructionAttention,
  updateConstructionAttention,
  deleteConstructionAttention,
  createAssistance,
  getAssistanceList,
  searchEmployee,
  getAttentionDetails,
  getAttention,
  getVisitStatistics,
  createVisitReport,
  exportVisits,
  updateVisitReport,
  getReportItems,
  exportEmployeesToAttend,
  getAttendedEmployeeByBusiness,
  getEmployeesToAttend,
  cleanCalendarEvents,
  getCalendarStats,
  getVisitReportItems,
  totalUsers
}

export default assistanceActions
