import Axios from '../../Axios'
import config from '../../config'
import questionEmpTypes from '../types/questionEmployee'

const validateRut = (body) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/public/employee/validate`, body)
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.SET_EMPLOYEE_ID,
          payload: data.employeeId
        })
        window.localStorage.setItem('employeeId', data.employeeId)
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmployeeDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.employee}/public/employee/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.QE_GET_EMPLOYEE_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const questionEmployeeActions = { validateRut, getEmployeeDetails }

export default questionEmployeeActions
