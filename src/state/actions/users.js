import queryString from 'query-string'
import Axios from '../../Axios'
import usersTypes from '../types/users'
import config from '../../config'

const getUsers =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.auth}/users?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({ type: usersTypes.GET_USERS, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getOTECUsers =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.auth}/users/search/otec?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getBosses =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.auth}/users/search/jefatura?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getUserDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.auth}/users/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: usersTypes.GET_USER, payload: data })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createUser = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.auth}/users`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateUser = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.auth}/users/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchUser = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.auth}/users/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updatePassword = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.auth}/users/${id}/change-password`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getFoundationUsers =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.auth
        }/users/search/foundation?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getSocialAssistanceList =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.auth
        }/users/search/assistance?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const usersActions = {
  getUsers,
  createUser,
  updateUser,
  patchUser,
  getUserDetails,
  updatePassword,
  getOTECUsers,
  getBosses,
  getFoundationUsers,
  getSocialAssistanceList
}

export default usersActions
