import queryString from 'query-string'
import Axios from '../../Axios'
import businessTypes from '../types/companies'

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({ type: businessTypes.BUSINESS_TOGGLE_CREATE, payload: !value })

const updateFilters = (filters) => (dispatch) =>
  dispatch({ type: businessTypes.BUSINESS_UPDATE_FILTERS, payload: filters })

const getCompanies = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/business?${queryString.stringify(query)}`)
      .then((response) => {
        const { data } = response.data
        dispatch({
          type: businessTypes.GET_BUSINESSES,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getCompany = (companyId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/business/${companyId}`)
      .then((response) => {
        const { data } = response.data
        dispatch({
          type: businessTypes.GET_BUSINESS_DETAIL,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const createCompany = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/business', values)
      .then((response) => {
        const { data } = response.data
        resolve(data.data)
      })
      .catch((err) => {
        console.log(err.response)
        reject(err.response.data.detail)
      })
  })

export default {
  toggleCreateModal,
  updateFilters,
  getCompanies,
  getCompany,
  createCompany
}
