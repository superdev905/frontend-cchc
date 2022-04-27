import queryString from 'query-string'
import Axios from '../../Axios'
import constructionTypes from '../types/construction'

const updateFilters = (filters) => (dispatch) =>
  dispatch({
    type: constructionTypes.CONSTRUCTIONS_UPDATE_FILTERS,
    payload: filters
  })

const getConstructionTypology = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/construction_typology?${queryString.stringify(query)}`)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTypologies =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/construction_typology?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({
            type: constructionTypes.GET_CONSTRUCTIONS_TYPOLOGIES,
            payload: data
          })
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })

const getSectors =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/economic_sectors?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({
            type: constructionTypes.GET_CONSTRUCTIONS_ECONOMIC_SECTOR,
            payload: data
          })
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })

const createConstruction = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/constructions', values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateConstruction = (constructionId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/constructions/${constructionId}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchConstruction = (constructionId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`/constructions/${constructionId}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getConstructions =
  (query, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/constructions?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: constructionTypes.GET_CONSTRUCTIONS,
              payload: data
            })
            dispatch({
              type: constructionTypes.SET_CONSTRUCTIONS_TOTAL,
              payload: data.length
            })
          }
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getConstruction =
  (constructionId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/constructions/${constructionId}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: constructionTypes.GET_CONSTRUCTION_DETAILS,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createConstructionTypology = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/construction_typology', values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateConstructionTypology = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/construction_typology/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const deleteConstructionTypology = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`/construction_typology/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getContacts =
  (idConstruction, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`/construction_contacts?construction_id=${idConstruction}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: constructionTypes.GET_CONSTRUCTIONS_CONTACTS,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })

const createContact = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`/construction_contacts`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/construction_contacts/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteContact = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`/construction_contacts/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const patchContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`/construction_contacts/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const constructionActions = {
  getConstructions,
  createConstruction,
  updateConstruction,
  patchConstruction,
  getConstruction,
  createConstructionTypology,
  getConstructionTypology,
  updateConstructionTypology,
  deleteConstructionTypology,
  getSectors,
  getTypologies,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  patchContact,
  updateFilters
}

export default constructionActions
