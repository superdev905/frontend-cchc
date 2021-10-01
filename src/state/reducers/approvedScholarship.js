import approvedTypes from '../types/approvedScholarship'

const initialState = {
  approvedStats: {
    total: 0,
    amount: 0
  }
}

const scholarshipsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case approvedTypes.GET_APPROVED_STATS:
      return { ...state, approvedStats: payload }

    default:
      return state
  }
}

export default scholarshipsReducers
