import axios from 'axios'
import config from './config'

const getBaseUrl = () => config.services.business

const Axios = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  mode: 'no-cors',
  maxBodyLength: 10000000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`
  }
})

Axios.interceptors.request.use(
  (settings) => {
    const token = window.localStorage.getItem('token')
    if (token) {
      settings.headers.Authorization = `Bearer ${token}`
    }
    return settings
  },
  (error) => {
    Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response) {
      if (
        error.response?.status === 401 &&
        originalRequest.url === '/auth/changetoken'
      ) {
        window.localStorage.clear()
        window.location.replace('/')
      }
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/login'
      ) {
        originalRequest._retry = true
        try {
          const res = await Axios.post(`/auth/changetoken`, {
            refreshToken: window.localStorage.getItem('refreshToken')
          })
          if (res.status === 200) {
            // 1) put token to LocalStorage
            window.localStorage.setItem('token', res.data.body.accessToken)
            // 2) Change Authorization header
            Axios.defaults.headers.common.Authorization =
              res.data.body.accessToken
            // 3) return originalRequest object with Axios.
            return Axios(originalRequest)
          }
        } catch (err) {
          if (err.response.status === 400) {
            window.localStorage.clear()
            window.location.replace('/')
          }
        }
      }
    }
    // return Error object with Promise
    return Promise.reject(error)
  }
)

Axios.defaults.headers.common['Content-Type'] = 'application/json'

export default Axios
