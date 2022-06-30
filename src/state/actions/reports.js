import { saveAs } from 'file-saver'
import queryString from 'query-string'
import Axios from '../../Axios'
import questionsTypes from '../types/questions'
import config from '../../config'

//  Falta backend de Stats de reportes

const getStats = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.question}/stats/general?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_GENERAL_STATS, payload: data })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getVisitsReport = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.assistance}/reports/visits`, values, {
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
        reject(err.response.data)
      })
  })

const getVisitsReportByCompany = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/reports/visit-by-company`,
      values,
      {
        responseType: 'arraybuffer'
      }
    )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Visitas-empresa-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getVisitsReportByAssigned = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/reports/visit-by-assigned`,
      values,
      {
        responseType: 'arraybuffer'
      }
    )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Visitas-assigned-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getAssistanceReportByEmployee = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/reports/assistance-employee`,
      values,
      {
        responseType: 'arraybuffer'
      }
    )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Assistance-employee-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getAssistanceReportByCompany = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/reports/assistance-company`,
      values,
      {
        responseType: 'arraybuffer'
      }
    )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Assistance-company-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getMonthlyReport = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.assistance}/reports/visit-by-company`,
      values,
      {
        responseType: 'arraybuffer'
      }
    )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Visitas-empresa-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const reportsActions = {
  getStats,
  getVisitsReport,
  getVisitsReportByCompany,
  getVisitsReportByAssigned,
  getAssistanceReportByEmployee,
  getAssistanceReportByCompany,
  getMonthlyReport
}

export default reportsActions
