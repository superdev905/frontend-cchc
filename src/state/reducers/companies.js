import businessTypes from '../types/companies'

const initialState = {
  list: [],
  showCreateModal: false,
  filters: {
    page: 0,
    limit: 20,
    search: ''
  },
  company: null,
  create: {
    step: 0
  }
}

const companiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case businessTypes.GET_BUSINESSES:
      return { ...state, list: payload }
    case businessTypes.BUSINESS_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    case businessTypes.BUSINESS_UPDATE_FILTERS:
      return { ...state, filters: payload }
    case businessTypes.GET_BUSINESS_DETAIL:
      return { ...state, company: payload }
    case businessTypes.BUSINESS_UPDATE_CREATE:
      return { ...state, create: payload }
    default:
      return state
  }
}

export default companiesReducer
