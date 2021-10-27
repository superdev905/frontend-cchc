import benefitsTypes from '../types/benefits'

const initialState = {
  create: {
    step: 0
  },
  benefits: [],
  activities: [],
  showCreateModal: false,
  benefitDetails: null,
  activityDetails: null,
  total: 0,
  totalActivities: 0
}

const benefitsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case benefitsTypes.BENEFIT_UPDATE_CREATE:
      return { ...state, create: payload }
    case benefitsTypes.BENEFIT_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    case benefitsTypes.GET_BENEFITS:
      return { ...state, benefits: payload }
    case benefitsTypes.SET_TOTAL_BENEFITS:
      return { ...state, total: payload }
    case benefitsTypes.GET_BENEFIT_DETAILS:
      return { ...state, benefitDetails: payload }
    case benefitsTypes.GET_ACTIVITIES:
      return { ...state, activities: payload }
    case benefitsTypes.SET_TOTAL_ACTIVITIES:
      return { ...state, totalActivities: payload }
    case benefitsTypes.GET_ACTIVITY_DETAILS:
      return { ...state, activityDetails: payload }
    default:
      return state
  }
}

export default benefitsReducers
