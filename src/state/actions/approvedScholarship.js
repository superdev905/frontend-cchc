import queryString from 'query-string'
import Axios from '../../Axios'
import config from '../../config'

const createBEATracking = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/tracking/scholarship-bea`,
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
const createBeshBestTracking = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/tracking/scholarship-besh-best`,
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
const createPMATracking = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.scholarship}/tracking/scholarship-pma`,
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

const getTrackingList = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.scholarship}/tracking?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getBEATrackingList = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.scholarship
      }/tracking/scholarship-bea?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getBeshBestrackingList = (query) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.scholarship
      }/tracking/scholarship-besh-best?${queryString.stringify(query)}`
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
  createBEATracking,
  createBeshBestTracking,
  createPMATracking,
  getTrackingList,
  getBEATrackingList,
  getBeshBestrackingList,
  updateBenefit,
  patchBenefit,
  getApprovedStats
}
