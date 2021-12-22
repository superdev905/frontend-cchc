import unemployedTypes from '../types/unemployed'

const initialState = {
  unemployedList: [],
  benefitsHistoryList: [],
  unemployed: null,
  query: {
    page: 1,
    size: 30
  },
  filters: {},
  totalUnemployed: 0,
  totalBenefitsHistory: 0
}

const unemployedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case unemployedTypes.GET_UNEMPLOYED_LIST:
      return { ...state, unemployedList: payload }
    case unemployedTypes.GET_BENEFITS_HISTORY:
      return { ...state, benefitsHistoryList: payload }
    case unemployedTypes.GET_TOTAL_UNEMPLOYED:
      return { ...state, totalUnemployed: payload }
    case unemployedTypes.GET_TOTAL_BENEFITS_HISTORY:
      return { ...state, totalBenefitsHistory: payload }
    case unemployedTypes.GET_UNEMPLOYED:
      return { ...state, unemployed: payload }
    case unemployedTypes.SET_FILTERS:
      return { ...state, filters: payload }
    case unemployedTypes.SET_QUERY:
      return { ...state, query: payload }

    default:
      return state
  }
}

export default unemployedReducer
