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

const getWIthoutPayments =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.unemployed
        }/unemployed/without-payment?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const registerPayment = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.unemployed}/payments`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getPayments =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.unemployed}/payments?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: unemployedTypes.GET_UNEMPLOYED_PAYMENTS,
            payload: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getPayment = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.unemployed}/payments/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: unemployedTypes.GET_UNEMPLOYED_PAYMENT_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const registerMultiplePayment = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.unemployed}/payments/multiple`, values)
      .then((response) => {
        const { data } = response

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getBenefits =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.unemployed}/benefits?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: unemployedTypes.GET_UNEMPLOYED_BENEFITS,
            payload: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const updateDeliveredBenefit = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.unemployed}/unemployed/benefit/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const unemployedActions = {
  setQueryUnemployed,
  setFilters,
  setQuery,
  getUnemployed,
  getUnemployedById,
  createUnemployed,
  getEmployeesNonAddedByRut,
  getUnemployedBenefits,
  registerPayment,
  getPayments,
  getPayment,
  getWIthoutPayments,
  registerMultiplePayment,
  getBenefits,
  updateDeliveredBenefit
}

export default unemployedActions
