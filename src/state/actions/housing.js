import queryString from 'query-string'
import Axios from '../../Axios'
import housingTypes from '../types/housing'
import config from '../../config'

const getAgreements =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.housing}/agreements?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: housingTypes.GET_AGREEMENTS,
            payload: data.items
          })
          dispatch({
            type: housingTypes.SET_TOTAL_AGREEMENTS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getAgreementDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.housing}/agreements/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: housingTypes.GET_AGREEMENT_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createAgreement = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.housing}/agreements`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getAgreementEmployees =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.housing}/employees?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: housingTypes.GET_AGREEMENT_EMPLOYEES,
            payload: data.items
          })
          dispatch({
            type: housingTypes.SET_TOTAL_AGREEMENT_EMPLOYEES,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getEmployee = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.housing}/employees/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: housingTypes.GET_HOUSING_EMPLOYEE_DETAILS,
          payload: data
        })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createEmployeeSaving = (id, values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.housing}/employees/${id}/saving`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: housingTypes.UPDATE_EMPLOYEE_SAVING,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEmployeeSaving = (id, values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.housing}/employees/saving/${id}`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: housingTypes.UPDATE_EMPLOYEE_SAVING,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createEmployeeDiagnostic = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.housing}/employees/${id}/diagnostic`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEmployeeDiagnostic = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.housing}/employees/diagnostic/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmployeePhases =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.housing}/employee-phases?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const updatePhase = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.housing}/employee-phases/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const housingActions = {
  createAgreement,
  getAgreements,
  getAgreementDetails,
  getAgreementEmployees,
  getEmployee,
  createEmployeeSaving,
  updateEmployeeSaving,
  createEmployeeDiagnostic,
  updateEmployeeDiagnostic,
  getEmployeePhases,
  updatePhase
}

export default housingActions
