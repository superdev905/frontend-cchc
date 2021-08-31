import pollTypes from '../types/poll'

const initialState = {
  pollList: [],
  poll: null,
  questionTypesList: [],
  total: 0,
  questionList: [],
  totalQuestions: 0,
  question: null
}

const pollReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case pollTypes.GET_POLLS:
      return { ...state, pollList: payload }
    case pollTypes.GET_POLL_DETAILS:
      return { ...state, poll: payload }
    case pollTypes.GET_QUESTION_TYPES:
      return { ...state, questionTypesList: payload }
    case pollTypes.SET_TOTAL_POLLS:
      return { ...state, total: payload }
    case pollTypes.GET_QUESTIONS:
      return { ...state, questionList: payload }
    case pollTypes.GET_QUESTION_DETAILS:
      return { ...state, question: payload }
    default:
      return state
  }
}

export default pollReducer
