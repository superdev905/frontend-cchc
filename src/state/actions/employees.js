import Axios from '../../Axios'
import employeesTypes from '../types/employees'

const employeeEndpoint = 'http://localhost:8000/api/v1'

const getEmployees = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/employees`)
      .then((response) => {
        const { data } = response
        dispatch({ type: employeesTypes.GET_EMPLOYEES, payload: data })
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

const getEmployeeContact = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/employee-contacts`)
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
  getEmployeeRelatives,
  updateRelative,
  blockRelative,
  createEmployeeContact,
  getEmployeeContact
}
