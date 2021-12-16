import queryString from 'query-string'
import Axios from '../../Axios'
import questionsTypes from '../types/questions'
import config from '../../config'

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

const questionActions = {
  getQuestions,
  questionAssign,
  getQuestionDetails,
  toggleCreateModal
}

export default questionActions
