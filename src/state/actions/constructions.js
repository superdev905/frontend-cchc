import queryString from 'query-string'
import Axios from '../../Axios'
import constructionTypes from '../types/construction'

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
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
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
        reject(err.response.data)
      })
  })

const deleteConstruction = (constructionId) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`/constructions/${constructionId}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getConstructions = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/constructions?${queryString.stringify(query)}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: constructionTypes.GET_CONSTRUCTIONS,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })
const getConstruction = (constructionId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/constructions/${constructionId}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: constructionTypes.GET_CONSTRUCTION_DETAILS,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
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
        reject(err.response.data)
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

export default {
  getConstructions,
  createConstruction,
  updateConstruction,
  deleteConstruction,
  getConstruction,
  createConstructionTypology,
  getConstructionTypology,
  updateConstructionTypology,
  deleteConstructionTypology
}
