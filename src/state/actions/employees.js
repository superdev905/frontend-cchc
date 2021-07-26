import Axios from '../../Axios'
import employeesTypes from '../types/employees'

Axios.defaults.baseURL = 'http://localhost:8000/api/v1'

const getEmployees = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get('/employees', values)
      .then((response) => {
        const { data } = response
        dispatch({ type: employeesTypes.GET_EMPLOYEES, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  getEmployees
}
