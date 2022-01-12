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

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({
    type: protocolsTypes.PROTOCOLS_TOGGLE_CREATE,
    payload: !value
  })

const createProtocol = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.protocols}/protocols`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: protocolsTypes.CREATE_PROTOCOL,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateProtocol = (id, values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.protocols}/protocols/${id}`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: protocolsTypes.UPDATE_PROTOCOL,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getProtocolDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.protocols}/protocols/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: protocolsTypes.GET_PROTOCOL_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteProtocol = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.protocols}/protocols/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: protocolsTypes.DELETE_PROTOCOL,
          payload: id
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const protocolsActions = {
  getProtocols,
  getModuleProtocols,
  toggleCreateModal,
  createProtocol,
  getProtocolDetails,
  updateProtocol,
  deleteProtocol
}

export default protocolsActions
