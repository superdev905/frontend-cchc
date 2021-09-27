//  import queryString from 'query-string'
import Axios from '../../Axios'
//  import scholarshipTypes from '../types/scholarships'
import config from '../../config'

const createBEATracking = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/tracking/scholarship-bea`,
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

export default {
  createBEATracking
}
