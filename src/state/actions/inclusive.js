import queryString from 'query-string'
import Axios from '../../Axios'
import inclusiveTypes from '../types/inclusive'
import config from '../../config'

const getChargeMethods =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.inclusive}/charge-methods${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: inclusiveTypes.GET_CHARGE_METHODS,
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
    Axios.post(`${config.services.inclusive}/inclusion-case`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const inclusionActions = { getChargeMethods, createCase }

export default inclusionActions
