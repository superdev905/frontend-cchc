import queryString from 'query-string'
import Axios from '../../Axios'
import employeesTypes from '../types/employees'
import config from '../../config'

const getEmployees =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.employee}/employees?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: employeesTypes.GET_EMPLOYEES,
              payload: data.items
            })
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

const getEmployeeDetails =
  (id, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.employee}/employees/${id}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: employeesTypes.GET_EMPLOYEE_DETAILS,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createEmployee = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/employees`, values)
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
    Axios.put(`${config.services.employee}/employees/${id}`, values)
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
    Axios.patch(`${config.services.employee}/employees/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getAttachments =
  (id, query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.employee
        }/employees/${id}/attachments?${queryString.stringify(query)}`
      )
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
    Axios.post(`${config.services.employee}/employee-relatives`, values)
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
    Axios.put(`${config.services.employee}/employee-relatives/${id}`, values)
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
    Axios.patch(`${config.services.employee}/employee-relatives/${id}/block`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchRelative = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.employee}/employee-relatives/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmployeeRelatives =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.employee}/employee-relatives?${queryString.stringify(
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

const getEmployeeRelative = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.employee}/employee-relatives/${id}`)
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
    Axios.post(`${config.services.employee}/employee-contacts`, values)
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
      `${config.services.employee}/employee-contacts?${queryString.stringify(
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

const updateEmployeeContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.employee}/employee-contacts/${id}`, values)
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
    Axios.patch(`${config.services.employee}/employee-contacts/${id}`, values)
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
      `${config.services.employee}/pension-situations?${queryString.stringify(
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

const createPensionSituation = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/pension-situations`, values)
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
    Axios.put(`${config.services.employee}/pension-situations/${id}`, values)
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
    Axios.patch(`${config.services.employee}/pension-situations/${id}`, values)
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
    Axios.post(`${config.services.employee}/housing-situation`, values)
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
      `${config.services.employee}/housing-situation?${queryString.stringify(
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

const updateHousingSituation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.employee}/housing-situation/${id}`, values)
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
    Axios.patch(`${config.services.employee}/housing-situation/${id}`, values)
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
      `${config.services.employee}/specialization?${queryString.stringify(
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

const createSpecialization = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/specialization`, values)
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
    Axios.put(`${config.services.employee}/specialization/${id}`, values)
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
    Axios.patch(`${config.services.employee}/specialization/${id}`, values)
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
      `${config.services.employee}/employee-jobs?${queryString.stringify(
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

const createEmployeeJob = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/employee-jobs`, values)
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
    Axios.put(`${config.services.employee}/employee-jobs/${id}`, values)
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
    Axios.patch(`${config.services.employee}/employee-jobs/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const createEmployeeRevision = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/employees/${id}/revision`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const employeeActions = {
  getEmployees,
  createEmployee,
  getEmployeeDetails,
  updateEmployee,
  createRelative,
  patchEmployee,
  getAttachments,
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
  patchEmployeeJob,
  getEmployeeRelative,
  createEmployeeRevision,
  patchRelative
}

export default employeeActions
