import queryString from 'query-string'
import Axios from '../../Axios'
import protocolsTypes from '../types/protocols'
import config from '../../config'

const getProtocols =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.protocols}/protocols?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: protocolsTypes.GET_PROTOCOLS,
            payload: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getModuleProtocols =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.protocols}/protocols/modules?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: protocolsTypes.GET_MODULE_PROTOCOLS,
            payload: data
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const protocolsActions = {
  getProtocols,
  getModuleProtocols
}

export default protocolsActions
