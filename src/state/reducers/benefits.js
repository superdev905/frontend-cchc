import benefitsTypes from '../types/benefits'

const initialState = {
  create: {
    step: 0
  },
  benefits: [],
  total: 0,
  benefitDetails: null
}

const benefitsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case benefitsTypes.BENEFIT_UPDATE_CREATE:
      return { ...state, create: payload }
    case benefitsTypes.GET_BENEFITS:
      return { ...state, benefits: payload }
    case benefitsTypes.SET_TOTAL_BENEFITS:
      return { ...state, total: payload }
    case benefitsTypes.GET_BENEFIT_DETAILS:
      return { ...state, benefitDetails: payload }
    default:
      return state
  }
}

export default benefitsReducers
