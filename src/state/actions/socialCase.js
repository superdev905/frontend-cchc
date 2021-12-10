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
          dispatch({
            type: socialCaseTypes.GET_INTERVENTION_PLANS,
            payload: data.items
          })
          dispatch({
            type: socialCaseTypes.SET_INTERVENTION_PLAN_TOTAL,
            payload: data.total
          })
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createInterventionTask = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.socialCase}/intervention-plans`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.CREATE_TASK_INTERVENTION_PLAN,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateInterventionTask = (id, values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.socialCase}/intervention-plans/${id}`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.UPDATE_TASK_INTERVENTION_PLAN,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteInterventionTask = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.socialCase}/intervention-plans/${id}`)
      .then(() => {
        dispatch({
          type: socialCaseTypes.DELETE_TASK_INTERVENTION_PLAN,
          payload: id
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const socialCasesActions = {
  getSocialCases,
  setFilters,
  createSocialCase,
  getListCases,
  getInterventionPlans,
  createInterventionTask,
  updateInterventionTask,
  deleteInterventionTask
}

export default socialCasesActions
