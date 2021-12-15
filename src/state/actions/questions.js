import Axios from '../../Axios'
import questionsTypes from '../types/questions'
import config from '../../config'

const QuestionAssign = (values) => () =>
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
    Axios.get(`${config.services.question}/question/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.Get_QUESTION_DETAILS, payloda: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const toggleCreateModal = (value) => (dispatch) =>
  dispatch({ type: questionsTypes.QUESTIONS_TOGGLE_CREATE, payload: !value })

export default { toggleCreateModal, QuestionAssign, getQuestionDetails }
