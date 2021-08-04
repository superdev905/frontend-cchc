import queryString from 'query-string'
import Axios from '../../Axios'
import usersTypes from '../types/users'

const usersEndpoint = `${
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'http://fcchc-itprocess.southcentralus.cloudapp.azure.com:5500'
    : 'http://localhost:5500'
}/api/v1`

const getUsers =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${usersEndpoint}/users?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({ type: usersTypes.GET_USERS, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createUser = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${usersEndpoint}/users`, values)
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
    Axios.put(`${usersEndpoint}/users/${id}`, values)
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
    Axios.patch(`${usersEndpoint}/users/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default { getUsers, createUser, updateUser, patchUser }
