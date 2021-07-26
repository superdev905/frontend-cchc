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

export default {
  getEmployees,
  createEmployee
}
