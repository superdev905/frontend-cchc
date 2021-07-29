import commonTypes from '../types/common'

const initialState = {
  regions: [],
  charges: [],
  maritalStatus: [],
  nationalities: [],
  scholarshipList: [],
  banks: [],
  rshList: [],
  relationshipList: [],
  activities: []
}

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.GET_REGIONS:
      return { ...state, regions: payload }
    case commonTypes.GET_CHARGES:
      return { ...state, charges: payload }
    case commonTypes.GET_MARITAL_STATUS:
      return { ...state, maritalStatus: payload }
    case commonTypes.GET_SCHOLARSHIP:
      return { ...state, scholarshipList: payload }
    case commonTypes.GET_NATIONALITIES:
      return { ...state, nationalities: payload }
    case commonTypes.GET_BANKS:
      return { ...state, banks: payload }
    case commonTypes.GET_RSH:
      return { ...state, rshList: payload }
    case commonTypes.GET_RELATIONSHIPS:
      return { ...state, relationshipList: payload }
    case commonTypes.GET_ACTIVITIES:
      return { ...state, activities: payload }
    default:
      return state
  }
}

export default commonReducer
