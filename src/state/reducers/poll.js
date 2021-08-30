import pollTypes from '../types/poll'

const initialState = {
  pollList: [],
  total: 0
}

const pollReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case pollTypes.GET_POLLS:
      return { ...state, pollList: payload }
    case pollTypes.SET_TOTAL_POLLS:
      return { ...state, total: payload }
    default:
      return state
  }
}

export default pollReducer
