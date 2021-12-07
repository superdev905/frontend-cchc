import queryString from 'query-string'
import Axios from '../../Axios'
import socialCaseTypes from '../types/socialCase'
import config from '../../config'

const getSocialCases =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.socialCase}/social-cases?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: socialCaseTypes.GET_CASES, payload: data.items })
          dispatch({
            type: socialCaseTypes.SET_TOTAL_CASES,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const setFilters = (value) => (dispatch) =>
  dispatch({ type: socialCaseTypes.SET_FILTERS, payload: value })

export default {
  getSocialCases,
  setFilters
}
