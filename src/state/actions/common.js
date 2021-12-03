import queryString from 'query-string'
import Axios from '../../Axios'
import commonTypes from '../types/common'
import config from '../../config'

const getRegions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/regions`)
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
    Axios.get(`${config.services.parameters}/contact_charges`)
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

const getTypologies = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/construction-typologies`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: commonTypes.GET_CONSTRUCTION_TYPOLOGIES,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getEconomicSectors = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/economic-sectors`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: commonTypes.GET_ECONOMIC_SECTORS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getMaritalStatuses = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/marital-status`)
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
    Axios.get(`${config.services.parameters}/scholarship`)
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
    Axios.get(`${config.services.parameters}/nationalities`)
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
    Axios.get(`${config.services.parameters}/banks`)
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
    Axios.get(`${config.services.parameters}/rsh`)
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
    Axios.get(`${config.services.parameters}/activities`)
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
    Axios.get(`${config.services.parameters}/relationships`)
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
    Axios.get(`${config.services.parameters}/isapre-fonasa`)
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
    Axios.get(`${config.services.parameters}/afp-isp`)
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
    Axios.get(`${config.services.parameters}/types-home`)
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
    Axios.get(`${config.services.parameters}/property-home`)
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
    Axios.get(`${config.services.parameters}/types-subsidy`)
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
    Axios.get(`${config.services.parameters}/specialties`)
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
    Axios.get(`${config.services.parameters}/entities`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_ENTITIES, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getEventTypes = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/task-type`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_EVENT_TYPES, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getShiftList = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/shift`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_SHIFT_LIST, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getShiftDetails = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/shift/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getAssistanceTypes = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/assistance-type`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_ASSISTANCE_TYPES, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getAreas = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/areas`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_AREAS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getManagement = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/management`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_MANAGEMENT, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTopics = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/topics`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_TOPICS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getInterventionDetails = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/assistance/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getRoles = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.auth}/roles`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_ROLES, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getAllOTECS =
  (query, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.parameters}/otecs?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: commonTypes.GET_OTECS,
              payload: data.items
            })
            dispatch({
              type: commonTypes.SET_TOTAL_OTECS,
              payload: data.total
            })
          }
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })

const createOTEC = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.parameters}/otecs`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateOTEC = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.parameters}/otecs/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const deleteOTEC = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.parameters}/otecs/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const getCommunes = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/communes`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.GET_COMMUNES, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  getRegions,
  getCharges,
  getTypologies,
  getEconomicSectors,
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
  getEntities,
  getEventTypes,
  getShiftList,
  getShiftDetails,
  getAssistanceTypes,
  getAreas,
  getManagement,
  getTopics,
  getInterventionDetails,
  getRoles,
  getAllOTECS,
  createOTEC,
  updateOTEC,
  deleteOTEC,
  getCommunes
}
