import commonTypes from '../types/common'

const initialState = {
  regions: [],
  charges: [],
  constructionTypologies: [],
  economicSectors: [],
  maritalStatus: [],
  nationalities: [],
  scholarshipList: [],
  banks: [],
  rshList: [],
  relationshipList: [],
  activities: [],
  IsapreFonasaList: [],
  AfpIspList: [],
  propertyHomeList: [],
  typesHomeList: [],
  subsidyList: [],
  specList: [],
  entities: [],
  eventTypes: [],
  shiftList: [],
  assistanceTypes: [],
  topics: [],
  managementList: [],
  areas: []
}

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.GET_REGIONS:
      return { ...state, regions: payload }
    case commonTypes.GET_CHARGES:
      return { ...state, charges: payload }
    case commonTypes.GET_CONSTRUCTION_TYPOLOGIES:
      return { ...state, constructionTypologies: payload }
    case commonTypes.GET_ECONOMIC_SECTORS:
      return { ...state, economicSectors: payload }
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
    case commonTypes.GET_ISAPRE_FONASA:
      return { ...state, IsapreFonasaList: payload }
    case commonTypes.GET_AFP_ISP:
      return { ...state, AfpIspList: payload }
    case commonTypes.GET_TYPES_HOME:
      return { ...state, typesHomeList: payload }
    case commonTypes.GET_PROPERTY_HOME:
      return { ...state, propertyHomeList: payload }
    case commonTypes.GET_TYPES_SUBSIDY:
      return { ...state, subsidyList: payload }
    case commonTypes.GET_SPEC_LIST:
      return { ...state, specList: payload }
    case commonTypes.GET_ENTITIES:
      return { ...state, entities: payload }
    case commonTypes.GET_EVENT_TYPES:
      return { ...state, eventTypes: payload }
    case commonTypes.GET_SHIFT_LIST:
      return { ...state, shiftList: payload }
    case commonTypes.GET_ASSISTANCE_TYPES:
      return { ...state, assistanceTypes: payload }
    case commonTypes.GET_TOPICS:
      return { ...state, topics: payload }
    case commonTypes.GET_MANAGEMENT:
      return { ...state, managementList: payload }
    case commonTypes.GET_AREAS:
      return { ...state, areas: payload }
    default:
      return state
  }
}

export default commonReducer
