import housingTypes from '../types/housing'

const initialState = {
  list: [],
  totalPages: 0
}

const housingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case housingTypes.GET_AGREEMENTS:
      return { ...state, list: payload }
    default:
      return state
  }
}

export default housingReducer
