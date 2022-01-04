import queryString from 'query-string'
import Axios from '../../Axios'
import config from '../../config'
import inclusionTypes from '../types/inclusion'

const getCaseDetails = (caseId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.inclusion}/inclusion-cases/${caseId}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: inclusionTypes.GET_INCLUSIONCASE_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getChargeMethods =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.inclusion}/charge-methods${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: inclusionTypes.GET_CHARGE_METHODS,
            payload: data.items
          })
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })
const createCase = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.inclusion}/inclusion-case`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const inclusionActions = { getCaseDetails, getChargeMethods, createCase }

export default inclusionActions
