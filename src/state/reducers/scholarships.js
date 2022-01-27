import scholarshipTypes from '../types/scholarships'

const initialState = {
  showCreateModal: false,
  application: null,
  applicationsList: [],
  scholarshipType: [],
  careers: [],
  total: 0,
  create: {
    step: 0
  },
  approvedScholarships: [],
  approvedScholarship: null,
  totalApproved: 0,
  benefitsList: [],
  salaryLiquidation: null,
  liquidationList: [],
  totalLiquidations: 0,
  stats: [],
  summary: []
}

const scholarshipsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case scholarshipTypes.APPLICATION_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    case scholarshipTypes.GET_APPLICATIONS:
      return { ...state, applicationsList: payload }
    case scholarshipTypes.SET_TOTAL_APPLICATIONS:
      return { ...state, total: payload }
    case scholarshipTypes.GET_APPLICATION_DETAILS:
      return { ...state, application: payload }
    case scholarshipTypes.GET_SCHOLARSHIPS_TYPES:
      return { ...state, scholarshipType: payload }
    case scholarshipTypes.POSTULATION_UPDATE_CREATE:
      return { ...state, create: payload }
    case scholarshipTypes.GET_CAREERS:
      return { ...state, careers: payload }
    case scholarshipTypes.GET_APPROVED_SCHOLARSHIPS:
      return { ...state, approvedScholarships: payload }
    case scholarshipTypes.SET_APPROVED_SCHOLARSHIPS_TOTAL:
      return { ...state, totalApproved: payload }
    case scholarshipTypes.GET_APPROVED_SCHOLARSHIP:
      return { ...state, approvedScholarship: payload }
    case scholarshipTypes.GET_BENEFITS:
      return { ...state, benefitsList: payload }
    case scholarshipTypes.GET_SALARY_LIQUIDATION:
      return { ...state, salaryLiquidation: payload }
    case scholarshipTypes.GET_ALL_SALARY_LIQUIDATIONS:
      return { ...state, liquidationList: payload }
    case scholarshipTypes.SCHOLARSHIP_DASH_STATS:
      return { ...state, stats: payload }
    case scholarshipTypes.SCHOLARSHIP_DASH_SUMMARY:
      return { ...state, summary: payload }
    default:
      return state
  }
}

export default scholarshipsReducers
