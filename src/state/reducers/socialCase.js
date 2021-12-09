import socialCaseTypes from '../types/socialCase'

const initialState = {
  casesList: [],
  filters: {
    page: 1,
    size: 30,
    search: '',
    businessId: '',
    STATE: '',
    assistanceId: '',
    zone: '',
    delegation: '',
    areaId: '',
    startDate: '',
    endDate: ''
  },
  totalCases: 0,
  caseDetails: null
}

const socialCase = (state = initialState, { type, payload }) => {
  switch (type) {
    case socialCaseTypes.GET_CASES:
      return { ...state, casesList: payload }
    case socialCaseTypes.SET_TOTAL_CASES:
      return { ...state, totalCases: payload }
    case socialCaseTypes.SET_FILTERS:
      return { ...state, filters: payload }
    default:
      return state
  }
}

export default socialCase
