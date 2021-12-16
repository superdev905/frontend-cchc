import questionTypes from '../types/questions'

const initialState = {
  questions: [],
  totalQuestions: 0,
  question: null
}

const questionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case questionTypes.GET_QUESTIONS:
      return { ...state, questions: payload }
    case questionTypes.SET_TOTAL_QUESTIONS:
      return { ...state, totalQuestions: payload }
    case questionTypes.GET_QUESTION_DETAILS:
      return { ...state, question: payload }

    default:
      return state
  }
}

export default questionsReducer
