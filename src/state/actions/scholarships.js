import queryString from 'query-string'
import Axios from '../../Axios'
import scholarshipTypes from '../types/scholarships'
import config from '../../config'

const updateCreate = (form) => (dispatch) =>
  dispatch({ type: scholarshipTypes.POSTULATION_UPDATE_CREATE, payload: form })

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({
    type: scholarshipTypes.APPLICATION_TOGGLE_CREATE,
    payload: !value
  })

const getPostulations =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.scholarship}/postulations?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: scholarshipTypes.GET_APPLICATIONS,
            payload: data.items
          })
          dispatch({
            type: scholarshipTypes.SET_TOTAL_APPLICATIONS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getPostulationDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.scholarship}/postulations/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.GET_APPLICATION_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createApplications = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.scholarship}/postulations`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getScholarshipTypes = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.scholarship}/scholarship-types`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.GET_SCHOLARSHIPS_TYPES,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const updatePostulation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.scholarship}/postulations/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getCareers = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/careers`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.GET_CAREERS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const deletePostulation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.scholarship}/postulations/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const postulationApprove = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/postulations/${id}/approve`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const postulationReject = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/postulations/${id}/reject`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const postulationRevision = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/postulations/${id}/request-revision`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const scholarshipsActions = {
  updateCreate,
  toggleCreateModal,
  getPostulations,
  getPostulationDetails,
  createApplications,
  getScholarshipTypes,
  updatePostulation,
  getCareers,
  deletePostulation,
  postulationApprove,
  postulationReject,
  postulationRevision
}

export default scholarshipsActions
