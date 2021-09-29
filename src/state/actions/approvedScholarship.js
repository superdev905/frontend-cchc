import queryString from 'query-string'
import Axios from '../../Axios'
import config from '../../config'

const trackingTypes = {
  ACADEMIC_EXCELLENCE_SCHOLARSHIP: 'scholarship-bea',
  BEST: 'scholarship-besh-best',
  BESH: 'scholarship-besh-best',
  PMA: 'scholarship-pma'
}

const createTracking = (type, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/tracking/${trackingTypes[type]}`,
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

const updateTracking = (id, type, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.scholarship}/tracking/${trackingTypes[type]}/${id}`,
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

const getTrackingList = (type, query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.scholarship}/tracking/${
        trackingTypes[type]
      }?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchTracking = (id, type, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(
      `${config.services.scholarship}/tracking/${trackingTypes[type]}/${id}`,
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

const updateBenefit = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.scholarship}/benefits/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchBenefit = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.scholarship}/benefits/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getApprovedStats = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.scholarship}/approved-scholarships/${id}/stats`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  updateTracking,
  getTrackingList,
  createTracking,
  patchTracking,
  updateBenefit,
  patchBenefit,
  getApprovedStats
}
