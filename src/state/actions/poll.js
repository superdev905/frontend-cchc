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
        console.log(data)
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
        console.log('poll Details')
        console.log(data)
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
        console.log(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
        console.log('error')
      })
  })

const getQuestions =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.poll}/poll-questions?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: pollTypes.GET_QUESTIONS, payload: data })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

export default {
  getPolls,
  createPoll,
  updatePoll,
  getQuestionTypes,
  getPollDetails,
  createQuestions,
  getQuestions,
  getModulePolls
}
