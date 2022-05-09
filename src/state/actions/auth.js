import Axios from '../../Axios'
import authTypes from '../types/auth'
import config from '../../config'

const loginUser = (credentials) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.auth}/auth/login`, credentials)
      .then((response) => {
        const { data } = response
        //  dispatch({ type: authTypes.SET_CURRENT_USER, payload: data.user })
        window.localStorage.setItem('token', data.access_token)
        //  window.localStorage.setItem('refreshToken', data.refreshToken)
        dispatch({ type: authTypes.LOGIN_USER, payload: true })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const refreshToken = () =>
  new Promise((resolve, reject) => {
    Axios.post('/auth/changetoken', {
      refreshToken: window.localStorage.getItem('refreshToken')
    })
      .then((response) => {
        window.localStorage.setItem('token', response.data.token)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getLoggedUser = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.auth}/auth/me`)
      .then((response) => {
        dispatch({
          type: authTypes.GET_AUTHENTICATED,
          payload: response.data
        })
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })

const recoverPassword = (email) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/auth/recover-password', {
      email,
      hostname: `${window.location.protocol}//${window.location.host}/reset-password`
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const checkRecovery = (token) => () =>
  new Promise((resolve, reject) => {
    Axios.get('/auth/check-recovery', { token })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })

const resetPassword = (password, confirmationPassword, token) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/auth/reset-password', {
      password,
      confirmationPassword,
      token
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const logout = () => (dispatch) =>
  new Promise((resolve) => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    dispatch({ type: authTypes.LOGOUT_SUCCESS })
    window.location.reload()
    window.location.href = '/login'
    resolve()
  })

const changePasswordFirstLogin = (userId, password) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`/auth/change-password/${userId}`, {
      password
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const changePasswordProfile = (userId, oldPassword, newPassword) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`/auth/change-password-profile/${userId}`, {
      newPassword,
      oldPassword
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const reportEmail = (fileName, url, contacts, name, email) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.auth}/users/mail`, {
      fileName,
      url,
      contacts,
      name,
      email
    })
      .then((response) => {
        console.log('-----Respuesta exitosa del server------')
        console.log(response)
        console.log('-----Fin respuesta del server------')
        resolve(response.data)
      })
      .catch((error) => {
        console.log('-----Respuesta al no contactarse con el back------')
        console.log(error)
        console.log('-----Fin Respuesta al no contactarse con el back------')
        reject(error)
      })
  })

const authActions = {
  loginUser,
  getLoggedUser,
  refreshToken,
  logout,
  recoverPassword,
  checkRecovery,
  resetPassword,
  changePasswordFirstLogin,
  changePasswordProfile,
  reportEmail
}

export default authActions
