import queryString from 'query-string'
import Axios from '../../Axios'
import businessTypes from '../types/companies'

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({ type: businessTypes.BUSINESS_TOGGLE_CREATE, payload: !value })

const updateFilters = (filters) => (dispatch) =>
  dispatch({ type: businessTypes.BUSINESS_UPDATE_FILTERS, payload: filters })

const updateCreate = (form) => (dispatch) =>
  dispatch({ type: businessTypes.BUSINESS_UPDATE_CREATE, payload: form })

const getTreeCompanies = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/business/tree`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getCompanies =
  (query, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/business?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: businessTypes.GET_BUSINESSES,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
const getAvailableCompanies = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/business?type=${'EMPRESA PRINCIPAL'}&state=CREATED`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getMainCompany = (companyId) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/business/${companyId}`)
      .then((response) => {
        const { data } = response

        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getCompany = (companyId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/business/${companyId}`)
      .then((response) => {
        const { data } = response
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
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const createDivision = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/sub_business', values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const updateDivision = (divisionId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/sub_business/${divisionId}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const deleteDivision = (divisionId) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`/sub_business/${divisionId}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getDivisions = (companyId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/sub_business?business_id=${companyId}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: businessTypes.BUSINESS_GET_DIVISIONS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getContacts = (companyId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/business_contacts?business_id=${companyId}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: businessTypes.BUSINESS_GET_CONTACTS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getConstructions = (companyId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/constructions?business_id=${companyId}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: businessTypes.BUSINESS_GET_CONSTRUCTIONS,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const blockCompany = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`/business/${id}/block`)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const updateCompany = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/business/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

export default {
  toggleCreateModal,
  updateFilters,
  updateCreate,
  getCompanies,
  getCompany,
  createCompany,
  createDivision,
  updateDivision,
  deleteDivision,
  getDivisions,
  getContacts,
  getConstructions,
  blockCompany,
  updateCompany,
  getTreeCompanies,
  getMainCompany,
  getAvailableCompanies
}
