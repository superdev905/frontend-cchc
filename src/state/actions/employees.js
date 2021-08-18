import queryString from 'query-string'
import Axios from '../../Axios'
import employeesTypes from '../types/employees'

export const employeeEndpoint = `${
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5104'
    : 'http://localhost:8000'
}/api/v1`

const getEmployees =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${employeeEndpoint}/employees?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: employeesTypes.GET_EMPLOYEES, payload: data.docs })
            dispatch({
              type: employeesTypes.SET_EMPLOYEES_TOTAL,
              payload: data.total
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getEmployeeDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/employees/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: employeesTypes.GET_EMPLOYEE_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createEmployee = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/employees`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEmployee = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/employees/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchEmployee = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/employees/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createRelative = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/employee-relatives`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateRelative = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/employee-relatives/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const blockRelative = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/employee-relatives/${id}/block`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmployeeRelatives = (employeeRun) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${employeeEndpoint}/employee-relatives?employee_run=${employeeRun}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createEmployeeContact = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/employee-contacts`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmployeeContact = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${employeeEndpoint}/employee-contacts?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEmployeeContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/employee-contacts/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchEmployeeContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/employee-contacts/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getPensionSituation = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${employeeEndpoint}/pension-situations?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createPensionSituation = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/pension-situations`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updatePensionSituation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/pension-situations/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchPensionSituation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/pension-situations/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createHousingSituation = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/housing-situation`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getHousingSituation = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${employeeEndpoint}/housing-situation?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateHousingSituation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/housing-situation/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchHousingSituation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/housing-situation/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getSpecializationHistory = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${employeeEndpoint}/specialization?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createSpecialization = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/specialization`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateSpecialization = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/specialization/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchSpecialization = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/specialization/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmployeeJobs = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${employeeEndpoint}/employee-jobs?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createEmployeeJob = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${employeeEndpoint}/employee-jobs`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateEmployeeJob = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${employeeEndpoint}/employee-jobs/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchEmployeeJob = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${employeeEndpoint}/employee-jobs/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  getEmployees,
  createEmployee,
  getEmployeeDetails,
  updateEmployee,
  createRelative,
  patchEmployee,
  getEmployeeRelatives,
  updateRelative,
  blockRelative,
  createEmployeeContact,
  getEmployeeContact,
  updateEmployeeContact,
  patchEmployeeContact,
  createPensionSituation,
  getPensionSituation,
  updatePensionSituation,
  patchPensionSituation,
  createHousingSituation,
  getHousingSituation,
  updateHousingSituation,
  patchHousingSituation,
  getSpecializationHistory,
  createSpecialization,
  updateSpecialization,
  patchSpecialization,
  getEmployeeJobs,
  createEmployeeJob,
  updateEmployeeJob,
  patchEmployeeJob
}
