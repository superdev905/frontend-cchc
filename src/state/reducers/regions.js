import regionsTypes from '../types/regions'

const initialState = {
  regions: []
}

const chargeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case regionsTypes.GET_REGIONS:
      return { ...state, regions: payload }
    default:
      return state
  }
}

export default chargeReducer
