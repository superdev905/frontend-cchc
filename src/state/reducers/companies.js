import businessTypes from '../types/companies'

const initialState = {
  companyCalendar: {},
  list: [],
  total: 0,
  showCreateModal: false,
  filters: {
    page: 0,
    limit: 20,
    search: ''
  },
  company: null,
  create: {
    step: 0
  },
  divisions: [],
  contacts: [],
  constructions: []
}

const companiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case businessTypes.GET_BUSINESSES:
      return { ...state, list: payload }
    case businessTypes.SET_BUSINESSES_TOTAL:
      return { ...state, total: payload }
    case businessTypes.BUSINESS_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    case businessTypes.BUSINESS_UPDATE_FILTERS:
      return { ...state, filters: payload }
    case businessTypes.GET_BUSINESS_DETAIL:
      return { ...state, company: payload }
    case businessTypes.BUSINESS_UPDATE_CREATE:
      return { ...state, create: payload }
    case businessTypes.BUSINESS_GET_DIVISIONS:
      return { ...state, divisions: payload }
    case businessTypes.BUSINESS_GET_CONTACTS:
      return { ...state, contacts: payload }
    case businessTypes.BUSINESS_GET_CONSTRUCTIONS:
      return { ...state, constructions: payload }
    case businessTypes.GET_COMPANY:
      return { ...state, companyCalendar: payload }
    default:
      return state
  }
}

export default companiesReducer
