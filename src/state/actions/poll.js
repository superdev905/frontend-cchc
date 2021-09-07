import { saveAs } from 'file-saver'
import queryString from 'query-string'
import Axios from '../../Axios'
import pollTypes from '../types/poll'
import config from '../../config'

const getPolls =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.poll}/polls?${queryString.stringify(query)}`)
        .then((response) => {
          const { data } = response
          dispatch({ type: pollTypes.GET_POLLS, payload: data.items })
          dispatch({ type: pollTypes.SET_TOTAL_POLLS, payload: data.total })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getModulePolls =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.poll}/polls/modules?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: pollTypes.GET_MODULE_POLLS, payload: data })

          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createPoll = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.poll}/polls`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
        console.log('error')
      })
  })

const updatePoll = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.poll}/polls/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getPollDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.poll}/polls/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: pollTypes.GET_POLL_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
        console.log(err)
      })
  })

const getQuestionTypes = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.poll}/question-types`)
      .then((response) => {
        const { data } = response
        dispatch({ type: pollTypes.GET_QUESTION_TYPES, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const createQuestions = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.poll}/poll-questions`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
        console.log('error')
      })
  })

const getQuestions =
  (query = {}, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.poll}/poll-questions?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({ type: pollTypes.GET_QUESTIONS, payload: data })
          }
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
          reject(err.response.data.detail)
        })
    })

const updateQuestion = (questionId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.poll}/poll-questions/${questionId}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getQuestionDetails = (questionId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.poll}/poll-questions/${questionId}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: pollTypes.GET_QUESTION_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
        console.log(err)
      })
  })

const deleteQuestion = (questionId) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.poll}/poll-questions/${questionId}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deletePoll = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.poll}/polls/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const answerPoll = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.poll}/polls/answer`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getPollAnswers =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.poll}/responses?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: pollTypes.GET_POLL_ANSWERS, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const exportData = (value) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.poll}/responses/export`, value, {
      responseType: 'arraybuffer'
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })

        saveAs(blob, `Respuestas-${value.poll_id}-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const toggleModal = (value) => (dispatch) =>
  dispatch({ type: pollTypes.POLL_AVAILABLE_TOGGLE, payload: !value })

export default {
  getPolls,
  createPoll,
  updatePoll,
  getQuestionTypes,
  getPollDetails,
  createQuestions,
  getQuestions,
  updateQuestion,
  getQuestionDetails,
  deleteQuestion,
  deletePoll,
  getModulePolls,
  answerPoll,
  getPollAnswers,
  exportData,
  toggleModal
}
