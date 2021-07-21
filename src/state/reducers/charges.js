import chargesTypes from '../types/charges'

const initialState = {
  charges: []
}

const chargeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case chargesTypes.GET_CHARGES:
      return { ...state, charges: payload }
    default:
      return state
  }
}

export default chargeReducer
