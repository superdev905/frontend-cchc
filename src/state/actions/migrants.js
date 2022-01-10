import queryString from 'query-string'
import Axios from '../../Axios'
import migrantsTypes from '../types/migrants'
import config from '../../config'

const getMigrants =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.migrant}/migrants?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: migrantsTypes.GET_MIGRANTS, payload: data.items })
            dispatch({
              type: migrantsTypes.GET_TOTAL_MIGRANTS,
              payload: data.total
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getMigrantDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.migrant}/migrants/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: migrantsTypes.GET_MIGRANT_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createMigration = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.migrant}/migrants`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const setFilters = (value) => (dispatch) =>
  dispatch({ type: migrantsTypes.SET_FILTERS, payload: value })

export default {
  getMigrants,
  createMigration,
  setFilters,
  getMigrantDetails
}
