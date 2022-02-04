import homeTypes from '../types/home'

const initialState = {
  nextVisits: [],
  deliveredBenefits: []
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case homeTypes.GET_VISITS_HOME:
      return { ...state, nextVisits: payload }
    case homeTypes.GET_HOME_BENEFITS_DELIVERED:
      return { ...state, deliveredBenefits: payload }
    default:
      return state
  }
}

export default authReducer
