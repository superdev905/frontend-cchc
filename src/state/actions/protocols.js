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

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({ type: protocolsTypes.PROTOCOLS_TOGGLE_CREATE, payload: !value })

const protocolsActions = {
  getProtocols,
  toggleCreateModal
}

export default protocolsActions
