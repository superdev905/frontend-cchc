import homeTypes from '../types/home'

const initialState = {
  nextVisits: [],
  deliveredBenefits: [],
  lastAttentions: []
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case homeTypes.GET_VISITS_HOME:
      return { ...state, nextVisits: payload }
    case homeTypes.GET_HOME_BENEFITS_DELIVERED:
      return { ...state, deliveredBenefits: payload }
    case homeTypes.GET_HOME_LAST_ATTENTIONS:
      return { ...state, lastAttentions: payload }
    default:
      return state
  }
}

export default authReducer
