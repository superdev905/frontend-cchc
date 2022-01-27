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
              payload: data.items
            })
            dispatch({
              type: businessTypes.SET_BUSINESSES_TOTAL,
              payload: data.total
            })
          }
          resolve(data.items)
        })
        .catch((err) => {
          reject(err)
        })
    })
const getAvailableCompanies = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/business?state=CREATED`)
      .then((response) => {
        const { data } = response
        resolve(data.items)
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

const getCompany =
  (companyId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/business/${companyId}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: businessTypes.GET_BUSINESS_DETAIL,
              payload: data
            })
          }
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
        resolve(data)
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

const getRelatedCompanies = (companyId) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/business/related?parent_id=${companyId}`)
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

const getConstructions =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/constructions?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({
            type: businessTypes.BUSINESS_GET_CONSTRUCTIONS,
            payload: data.items
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
        reject(err.response.data.detail)
      })
  })

const patchCompany = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`/business/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const suspendCompany = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`/business/${id}/suspend`)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
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

const searchCompanies = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/business/search?${queryString.stringify(query)}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const companiesActions = {
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
  getAvailableCompanies,
  getRelatedCompanies,
  searchCompanies,
  suspendCompany,
  patchCompany
}

export default companiesActions
