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

const getSocialCaseById =
  (socialCaseId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.socialCase}/social-cases/${socialCaseId}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: socialCaseTypes.GET_CASE_BY_ID, payload: data })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getListCases = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.socialCase}/social-cases/collect`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.GET_CASES_FOR_SELECTED,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const setFilters = (value) => (dispatch) =>
  dispatch({ type: socialCaseTypes.SET_FILTERS, payload: value })

const setTags = (value) => (dispatch) =>
  dispatch({ type: socialCaseTypes.SET_TAGS, payload: value })

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

const getInterventionPlans =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.socialCase
        }/intervention-plans?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: socialCaseTypes.GET_CASES, payload: data.items })
          dispatch({
            type: socialCaseTypes.SET_TOTAL_CASES,
            payload: data.total
          })
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createDerivation = (socialCaseId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.socialCase}/social-cases/${socialCaseId}/derivation`,
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

const getDerivation =
  (socialCaseId, derivationId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.socialCase}/social-cases/${socialCaseId}/derivation/${derivationId}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: socialCaseTypes.GET_DERIVATION_DETAILS,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createClosing = (socialCaseId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.socialCase}/social-cases/${socialCaseId}/close`,
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

const socialCasesActions = {
  getSocialCases,
  getSocialCaseById,
  setFilters,
  setTags,
  createSocialCase,
  getListCases,
  getInterventionPlans,
  createDerivation,
  getDerivation,
  createClosing
}

export default socialCasesActions
