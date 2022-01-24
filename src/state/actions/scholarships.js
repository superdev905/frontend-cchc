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

const getBenefits =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.scholarship}/benefits?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: scholarshipTypes.GET_BENEFITS, payload: data.items })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createBenefit = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.scholarship}/benefits`, values)
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

const getApprovedScholarships =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.scholarship
        }/approved-scholarships?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: scholarshipTypes.GET_APPROVED_SCHOLARSHIPS,
            payload: data.items
          })
          dispatch({
            type: scholarshipTypes.SET_APPROVED_SCHOLARSHIPS_TOTAL,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getApprovedScholarship = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.scholarship}/approved-scholarships/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.GET_APPROVED_SCHOLARSHIP,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getApplicationRevisions = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.scholarship}/postulations/${id}/revisions`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createSalaryLiquidation = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.scholarship}/salary-liquidations`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getSalaryLiquidation = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.scholarship}/salary-liquidations/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.GET_SALARY_LIQUIDATION,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getAllSalaryLiquidations =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.scholarship
        }/salary-liquidations?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: scholarshipTypes.GET_ALL_SALARY_LIQUIDATIONS,
            payload: data.items
          })
          dispatch({
            type: scholarshipTypes.SET_TOTAL_LIQUIDATIONS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const updateSalaryLiquidation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.scholarship}/salary-liquidations/${id}`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const patchSalaryLiquidation = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(
      `${config.services.scholarship}/salary-liquidations/${id}`,
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

const getSummary = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.scholarship}/dashboard/summary?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.SCHOLARSHIP_DASH_SUMMARY,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getStatsByType = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.scholarship}/dashboard/stats?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: scholarshipTypes.SCHOLARSHIP_DASH_STATS,
          payload: data
        })
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
  getCareers,
  getApprovedScholarships,
  getApprovedScholarship,
  getBenefits,
  createBenefit,
  updatePostulation,
  deletePostulation,
  postulationApprove,
  postulationReject,
  postulationRevision,
  getApplicationRevisions,
  createSalaryLiquidation,
  getSalaryLiquidation,
  getAllSalaryLiquidations,
  updateSalaryLiquidation,
  patchSalaryLiquidation,
  getStatsByType,
  getSummary
}

export default scholarshipsActions
