import unemployedTypes from '../types/unemployed'

const initialState = {
  unemployedList: [],
  benefitsHistoryList: [],
  unemployed: null,
  queryUnemployed: {
    search: '',
    page: 1,
    size: 50
  },
  query: {
    page: 1,
    size: 30
  },
  filters: {},
  totalUnemployed: 0,
  totalBenefitsHistory: 0,
  payments: [],
  payment: null,
  benefits: []
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
    case unemployedTypes.SET_QUERY_UNEMPLOYED:
      return { ...state, queryUnemployed: payload }
    case unemployedTypes.SET_FILTERS:
      return { ...state, filters: payload }
    case unemployedTypes.SET_QUERY:
      return { ...state, query: payload }
    case unemployedTypes.GET_UNEMPLOYED_PAYMENTS:
      return { ...state, payments: payload }
    case unemployedTypes.GET_UNEMPLOYED_PAYMENT_DETAILS:
      return { ...state, payment: payload }
    case unemployedTypes.GET_UNEMPLOYED_BENEFITS:
      return { ...state, benefits: payload }
    default:
      return state
  }
}

export default unemployedReducer
