import queryString from 'query-string'
import Axios from '../../Axios'
import socialCaseTypes from '../types/socialCase'
import config from '../../config'

const getSocialCases =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.socialCase}/social-cases?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: socialCaseTypes.GET_CASES, payload: data.items })
            dispatch({
              type: socialCaseTypes.SET_TOTAL_CASES,
              payload: data.total
            })
          }
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getSocialCaseById =
  (socialCaseId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.socialCase}/social-cases/${socialCaseId}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: socialCaseTypes.GET_CASE_BY_ID, payload: data })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getListCases = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.socialCase}/social-cases/collect/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.GET_CASES_FOR_SELECTED,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const setFilters = (value) => (dispatch) =>
  dispatch({ type: socialCaseTypes.SET_FILTERS, payload: value })

const setTags = (value) => (dispatch) =>
  dispatch({ type: socialCaseTypes.SET_TAGS, payload: value })

const createSocialCase = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.socialCase}/social-cases`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getInterventionPlans =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.socialCase
        }/intervention-plans?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: socialCaseTypes.GET_INTERVENTION_PLANS,
            payload: data.items
          })
          dispatch({
            type: socialCaseTypes.SET_INTERVENTION_PLAN_TOTAL,
            payload: data.total
          })
          resolve(data.items)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const cleanCalendarPlans = () => (dispatch) =>
  dispatch({
    type: socialCaseTypes.GET_INTERVENTION_PLANS_CALENDAR,
    payload: []
  })

const getPlansForCalendar =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${
          config.services.socialCase
        }/intervention-plans/calendar?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: socialCaseTypes.GET_INTERVENTION_PLANS_CALENDAR,
            payload: data
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createDerivation = (socialCaseId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.socialCase}/social-cases/${socialCaseId}/derivation`,
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

const editDerivation = (socialCaseId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.socialCase}/social-cases/derivation/edit/${socialCaseId}`,
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

const getDerivation =
  (socialCaseId, derivationId, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.socialCase}/social-cases/${socialCaseId}/derivation/${derivationId}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: socialCaseTypes.GET_DERIVATION_DETAILS,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getInterventionTaskDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.socialCase}/intervention-plans/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.GET_PLAN_TASK_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createInterventionTask = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.socialCase}/intervention-plans`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.CREATE_TASK_INTERVENTION_PLAN,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateInterventionTask = (id, values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.socialCase}/intervention-plans/${id}`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.UPDATE_TASK_INTERVENTION_PLAN,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const completeInterventionTask = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.socialCase}/intervention-plans/${id}/complete`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createClosing = (socialCaseId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.socialCase}/social-cases/${socialCaseId}/close`,
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

const deleteInterventionTask = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.socialCase}/intervention-plans/${id}`)
      .then(() => {
        dispatch({
          type: socialCaseTypes.DELETE_TASK_INTERVENTION_PLAN,
          payload: id
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getStats = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.socialCase}/dashboard/stats`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: socialCaseTypes.GET_SOCIAL_CASE_STATS,
          payload: data
        })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const DerivationUpdate = (socialCaseId, arrId) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.socialCase}/social-cases/${socialCaseId}`, {
      assistanceDerivationId: arrId
    })
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const SocialCaseMail = (type, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${
        config.services.socialCase
      }/social-cases/mail/social-case?${queryString.stringify(type)}`,
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

/*  Object Type to send mails
{
  to: [ <-- Arreglo de correos, dónde se enviarán los correos.
    "string"
  ],
  cc: [ <-- Arreglo de correos en copia.
    "string"
  ],
  date: "string", <-- Variable de fecha
  createdBy: "string", <-- Variable de quién creó caso social
  attended: "string", <-- Variable de quién fue atendido
  attendedRut: "string", <-- Variable rut del atendido
  obra: "string", <-- Variable nombre de obra.
  company: "string", <-- Variable nombre de empresa.
  createComment: "string", <-- Variable de comentario de creación
  createCommentEnd: "string", <-- Variable de comentario de cierre.
  socialCaseNumber: "string", <-- Variable número de caso social.
  dataTable: [ <-- Variable para generar la tabla en la "edición" de caso social (Al agregar tareas o modificar tareas del plan de intervención)
    {
      type: "string", <-- Tipo de tarea Ej: Reporte
      profesionalName: "string", <-- Nombre de a quién se le asignó
      date: "string" <-- Fecha en que se creó o modificó la tarea?
    }
  ],
  socialCaseCreatedAt: "string", <-- Fecha en que se creó el caso social.
  areaName: "string", <-- Nombre del área
  topicName: "string", <-- Nombre del tema
  derivatedBy: "string", <-- Quién deriva el caso social.
  officeDelegatedBy: "string", <-- Oficina desde la que se deriva?
  derivationComment: "string", <-- Comentario de derivación
  profesionalDerivatedList: [ <-- Arreglo con el listado de usuarios a los que se les derivó el caso social.
    {
      name: "string" <-- Nombre de usuarios.
    }
  ]
} */

const socialCasesActions = {
  getSocialCases,
  getSocialCaseById,
  setFilters,
  setTags,
  createSocialCase,
  getListCases,
  getInterventionPlans,
  createInterventionTask,
  updateInterventionTask,
  deleteInterventionTask,
  getPlansForCalendar,
  createDerivation,
  getDerivation,
  createClosing,
  getInterventionTaskDetails,
  completeInterventionTask,
  cleanCalendarPlans,
  getStats,
  DerivationUpdate,
  editDerivation,
  SocialCaseMail
}

export default socialCasesActions
