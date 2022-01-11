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
            payloda: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const protocolsActions = {
  getProtocols
}

export default protocolsActions
