// import queryString from 'query-string'
import Axios from '../../Axios'
import publicTypes from '../types/commonPublic'
import commonTypes from '../types/common'
import config from '../../config'

const getAreas = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/areas`)
      .then((response) => {
        const { data } = response
        dispatch({ type: publicTypes.PUBLIC_GET_AREAS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
const getRegions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/regions`)
      .then((response) => {
        const { data } = response
        dispatch({ type: publicTypes.PUBLIC_GET_REGIONS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getMaritalStatuses = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/marital-status`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_MARITAL_STATUS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getNationalities = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/nationalities`)
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
    Axios.get(`${config.services.parameters}/public/banks`)
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
    Axios.get(`${config.services.parameters}/public/rsh`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_RSH, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
const getScholarship = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/scholarship`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_SCHOLARSHIP, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const commonPublicActions = {
  getAreas,
  getRegions,
  getMaritalStatuses,
  getNationalities,
  getRSH,
  getBanks,
  getScholarship
}

export default commonPublicActions
