import pollTypes from '../types/poll'

const initialState = {
  allPoll: []
}

const pollReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case pollTypes.GET_POLLS:
      return { ...state, allPoll: payload }
    default:
      return state
  }
}

export default pollReducer
