import Axios from '../../Axios'
import questionsTypes from '../types/questions'
import config from '../../config'

const QuestionAssign = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.question}/webconsult`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({ type: questionsTypes.QUESTIONS_TOGGLE_CREATE, payload: !value })

export default { toggleCreateModal, QuestionAssign }
