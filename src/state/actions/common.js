import Axios from '../../Axios'
import commonTypes from '../types/common'

const employeeEndpoint = 'http://localhost:8000/api/v1'

const getRegions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/regions`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: commonTypes.GET_REGIONS,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getCharges = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/contact_charges`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: commonTypes.GET_CHARGES,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTypologies = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/construction_typology`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
const getMaritalStatuses = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/marital-status`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_MARITAL_STATUS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getScholarship = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/scholarship`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_SCHOLARSHIP, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getNationalities = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/nationalities`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_NATIONALITIES, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getBanks = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/banks`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_BANKS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getRSH = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/rsh`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_RSH, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getActivities = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/activities`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_ACTIVITIES, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
const getRelationships = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/relationships`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_RELATIONSHIPS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

export default {
  getRegions,
  getCharges,
  getTypologies,
  getMaritalStatuses,
  getScholarship,
  getNationalities,
  getBanks,
  getRSH,
  getRelationships,
  getActivities
}
