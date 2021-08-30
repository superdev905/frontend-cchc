import pollTypes from '../types/poll'

const initialState = {
  pollList: [],
  poll: null,
  questionTypesList: []
}

const pollReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case pollTypes.GET_POLLS:
      return { ...state, pollList: payload }
    case pollTypes.GET_POLL_DETAILS:
      return { ...state, poll: payload }
    case pollTypes.GET_QUESTION_TYPES:
      return { ...state, questionTypesList: payload }
    default:
      return state
  }
}

export default pollReducer
