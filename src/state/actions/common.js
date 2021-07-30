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

const getIsapreFonasa = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/isapre-fonasa`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_ISAPRE_FONASA, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getAfpIsp = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/afp-isp`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_AFP_ISP, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTypesHome = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/types-home`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_TYPES_HOME, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getPropertyHome = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/property-home`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_PROPERTY_HOME, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTypesSubsidy = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/types-subsidy`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_TYPES_SUBSIDY, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getSpecList = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/specialties`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_SPEC_LIST, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getEntities = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${employeeEndpoint}/entities`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_ENTITIES, payload: data })
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
  getActivities,
  getIsapreFonasa,
  getAfpIsp,
  getTypesHome,
  getPropertyHome,
  getTypesSubsidy,
  getSpecList,
  getEntities
}
