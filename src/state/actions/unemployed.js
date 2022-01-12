import queryString from 'query-string'
import unemployedTypes from '../types/unemployed'
import Axios from '../../Axios'
import config from '../../config'

const setFilters = (value) => (dispatch) =>
  dispatch({ type: unemployedTypes.SET_FILTERS, payload: value })

const setQuery = (value) => (dispatch) =>
  dispatch({ type: unemployedTypes.SET_QUERY, payload: value })

const setQueryUnemployed = (value) => (dispatch) =>
  dispatch({ type: unemployedTypes.SET_QUERY_UNEMPLOYED, payload: value })

const getUnemployed =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.unemployed}/unemployed?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: unemployedTypes.GET_UNEMPLOYED_LIST,
              payload: data.items
            })
            dispatch({
              type: unemployedTypes.GET_TOTAL_UNEMPLOYED,
              payload: data.total
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getUnemployedById =
  (unemployedId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.unemployed}/unemployed/${unemployedId}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: unemployedTypes.GET_UNEMPLOYED, payload: data })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getEmployeesNonAddedByRut = (rutEmployee) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.unemployed}/unemployed/search?rut=${rutEmployee}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createUnemployed = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.unemployed}/unemployed`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getUnemployedBenefits =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.benefits}/benefits?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

export default {
  setQueryUnemployed,
  setFilters,
  setQuery,
  getUnemployed,
  getUnemployedById,
  createUnemployed,
  getEmployeesNonAddedByRut,
  getUnemployedBenefits
}
