import homeTypes from '../types/home'

const initialState = {
  nextVisits: []
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case homeTypes.GET_VISITS_HOME:
      return { ...state, nextVisits: payload }
    default:
      return state
  }
}

export default authReducer
