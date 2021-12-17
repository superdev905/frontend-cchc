import queryString from 'query-string'
import Axios from '../../Axios'
import questionsTypes from '../types/questions'
import config from '../../config'

const updateQuery = (values) => (dispatch) =>
  dispatch({ type: questionsTypes.UPDATE_QUERY, payload: values })

const updateUIFilters = (values) => (dispatch) =>
  dispatch({ type: questionsTypes.UPDATE_UI_FILTERS, payload: values })

const updateSelectedList = (values) => (dispatch) =>
  dispatch({ type: questionsTypes.UPDATE_SELECTED_LIST, payload: values })

const questionAssign = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.question}/questions/assignation`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getQuestionDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.question}/questions/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_QUESTION_DETAILS, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const toggleCreateModal = (value) => (dispatch) =>
  dispatch({ type: questionsTypes.QUESTIONS_TOGGLE_CREATE, payload: !value })

const getQuestions = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.question}/questions?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_QUESTIONS, payload: data.items })
        dispatch({
          type: questionsTypes.SET_TOTAL_QUESTIONS,
          payload: data.total
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const answerQuestion = (number, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.question}/questions/${number}/answer`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getDistributionStats = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.question}/stats/distribution`)
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_DISTRIBUTION_STATS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })
const getLastQuestions = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.question}/questions/last?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_LAST_QUESTIONS, payload: data })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const getStats = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.question}/stats/general?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_GENERAL_STATS, payload: data })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const questionActions = {
  updateQuery,
  updateUIFilters,
  updateSelectedList,
  getQuestions,
  questionAssign,
  getQuestionDetails,
  toggleCreateModal,
  answerQuestion,
  getDistributionStats,
  getLastQuestions,
  getStats
}

export default questionActions
