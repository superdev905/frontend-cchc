import queryString from 'query-string'
import Axios from '../../Axios'
import socialCaseTypes from '../types/socialCase'
import config from '../../config'

const getSocialCases =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.socialCase}/social-cases?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: socialCaseTypes.GET_CASES, payload: data.items })
            dispatch({
              type: socialCaseTypes.SET_TOTAL_CASES,
              payload: data.total
            })
          }
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const setFilters = (value) => (dispatch) =>
  dispatch({ type: socialCaseTypes.SET_FILTERS, payload: value })

const createSocialCase = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.socialCase}/social-cases`, values)
      .then((response) => {
        const { data } = response
        resolve(data.items)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const socialCasesActions = {
  getSocialCases,
  setFilters,
  createSocialCase
}

export default socialCasesActions
