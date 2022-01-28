import queryString from 'query-string'
import Axios from '../../Axios'
import benefitsTypes from '../types/benefits'
import config from '../../config'

const updateCreate = (form) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: benefitsTypes.BENEFIT_UPDATE_CREATE, payload: form })
    resolve()
  })

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({
    type: benefitsTypes.BENEFIT_TOGGLE_CREATE,
    payload: !value
  })

const createBenefit = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.benefits}/benefits`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const updateBenefit = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.benefits}/benefits/${id}`, values)
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
        `${config.services.benefits}/benefits?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: benefitsTypes.GET_BENEFITS, payload: data.items })
          dispatch({
            type: benefitsTypes.SET_TOTAL_BENEFITS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getBenefitDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.benefits}/benefits/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: benefitsTypes.GET_BENEFIT_DETAILS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteBenefit = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.benefits}/benefits/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const benefitEndpoints = {
  BUSINESS: 'business',
  COURSE: 'course',
  GENERAL: 'general',
  SCHOLARSHIP: 'scholarship'
}

const updateRestriction = (id, type, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.benefits}/restrictions/${benefitEndpoints[type]}/${id}`,
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

const createRestriction = (type, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.benefits}/restrictions/${benefitEndpoints[type]}`,
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

const deleteRestriction = (benefitId, id, type) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(
      `${config.services.benefits}/restrictions/${benefitEndpoints[type]}/${benefitId}/${id}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createActivity = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.benefits}/activities`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getActivities =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.benefits}/activities?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: benefitsTypes.GET_ACTIVITIES, payload: data.items })
          dispatch({
            type: benefitsTypes.SET_TOTAL_ACTIVITIES,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getActivityDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.benefits}/activities/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: benefitsTypes.GET_ACTIVITY_DETAILS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateActivity = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.benefits}/activities/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteActivity = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.benefits}/activities/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getBenefitsForEmployee = (idEmployee) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.benefits}/benefits/employee/${idEmployee}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getBenefitsForBusiness = (idBusiness) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.benefits}/benefits/business/${idBusiness}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const benefitsActions = {
  updateCreate,
  toggleCreateModal,
  createBenefit,
  getBenefits,
  getBenefitDetails,
  deleteBenefit,
  updateBenefit,
  updateRestriction,
  createActivity,
  getActivities,
  getActivityDetails,
  updateActivity,
  deleteActivity,
  getBenefitsForEmployee,
  getBenefitsForBusiness,
  createRestriction,
  deleteRestriction
}

export default benefitsActions
