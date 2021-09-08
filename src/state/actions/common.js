import Axios from '../../Axios'
import commonTypes from '../types/common'
import config from '../../config'

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
    Axios.get(`${config.services.employee}/marital-status`)
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
    Axios.get(`${config.services.employee}/scholarship`)
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
    Axios.get(`${config.services.employee}/nationalities`)
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
    Axios.get(`${config.services.employee}/banks`)
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
    Axios.get(`${config.services.employee}/rsh`)
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
    Axios.get(`${config.services.employee}/activities`)
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
    Axios.get(`${config.services.employee}/relationships`)
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
    Axios.get(`${config.services.employee}/isapre-fonasa`)
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
    Axios.get(`${config.services.employee}/afp-isp`)
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
    Axios.get(`${config.services.employee}/types-home`)
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
    Axios.get(`${config.services.employee}/property-home`)
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
    Axios.get(`${config.services.employee}/types-subsidy`)
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
    Axios.get(`${config.services.employee}/specialties`)
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
    Axios.get(`${config.services.employee}/entities`)
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
        console.log(data)
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
  getEntities,
  getEventTypes,
  getShiftList,
  getShiftDetails,
  getAssistanceTypes,
  getAreas,
  getManagement,
  getTopics,
  getInterventionDetails
}
