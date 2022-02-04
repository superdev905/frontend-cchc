import queryString from 'query-string'
import Axios from '../../Axios'
import homeTypes from '../types/home'
import config from '../../config'

const cleanVisits = () => (dispatch) =>
  dispatch({ type: homeTypes.GET_VISITS_HOME, payload: [] })

const getVisitsHome =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.assistance}/home/visits?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: homeTypes.GET_VISITS_HOME, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getBenefitsDelivered = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.assistance}/home/delivered-benefits`)
      .then((response) => {
        const { data } = response
        dispatch({ type: homeTypes.GET_HOME_BENEFITS_DELIVERED, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getLastAttentions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.assistance}/home/attentions`)
      .then((response) => {
        const { data } = response
        dispatch({ type: homeTypes.GET_HOME_LAST_ATTENTIONS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const homeActions = {
  cleanVisits,
  getVisitsHome,
  getBenefitsDelivered,
  getLastAttentions
}

export default homeActions
