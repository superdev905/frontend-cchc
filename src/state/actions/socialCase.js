import queryString from 'query-string'
import Axios from '../../Axios'
import config from '../../config'

const getSocialCases =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.socialCase}/social-cases?${queryString.stringify(
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

export default {
  getSocialCases
}
