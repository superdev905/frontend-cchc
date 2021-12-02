import housingTypes from '../types/housing'

const initialState = {
  agreementList: [],
  totalAgreements: 0
}

const housingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case housingTypes.GET_AGREEMENTS:
      return { ...state, agreementList: payload }
    default:
      return state
  }
}

export default housingReducer
