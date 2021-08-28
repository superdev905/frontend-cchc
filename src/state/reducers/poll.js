import pollTypes from '../types/poll'

const initialState = {
  pollList: []
}

const pollReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case pollTypes.GET_POLLS:
      return { ...state, pollList: payload }
    default:
      return state
  }
}

export default pollReducer
