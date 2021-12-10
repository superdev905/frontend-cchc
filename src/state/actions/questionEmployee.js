import Axios from '../../Axios'
import config from '../../config'

const validateRut = (body) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/public/employee/validate`, body)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const questionEmployeeActions = { validateRut }

export default questionEmployeeActions
