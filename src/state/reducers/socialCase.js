import socialCaseTypes from '../types/socialCase'

const initialState = {
  casesList: [],
  filters: {
    page: 1,
    size: 30,
    search: '',
    businessId: '',
    isActive: '',
    employeeNames: '',
    zone: '',
    delegation: '',
    createdDate: '',
    areaId: ''
  },
  casesForSelect: [],
  totalCases: 0,
  caseDetails: null,
  interventionPlans: [],
  totalInterventions: 0
}

const socialCase = (state = initialState, { type, payload }) => {
  switch (type) {
    case socialCaseTypes.GET_CASES:
      return { ...state, casesList: payload }
    case socialCaseTypes.SET_TOTAL_CASES:
      return { ...state, totalCases: payload }
    case socialCaseTypes.SET_FILTERS:
      return { ...state, filters: payload }
    case socialCaseTypes.GET_CASES_FOR_SELECTED:
      return { ...state, casesForSelect: payload }
    case socialCaseTypes.GET_INTERVENTION_PLANS:
      return { ...state, interventionPlans: payload }
    case socialCaseTypes.SET_INTERVENTION_PLAN_TOTAL:
      return { ...state, totalInterventions: payload }
    case socialCaseTypes.CREATE_TASK_INTERVENTION_PLAN:
      return {
        ...state,
        interventionPlans: [{ ...payload }].concat(state.interventionPlans)
      }
    case socialCaseTypes.UPDATE_TASK_INTERVENTION_PLAN:
      return {
        ...state,
        interventionPlans: state.interventionPlans.map((item) =>
          item.id === payload.id ? payload : item
        )
      }
    case socialCaseTypes.DELETE_TASK_INTERVENTION_PLAN:
      return {
        ...state,
        interventionPlans: state.interventionPlans.filter(
          (item) => item.id !== payload
        )
      }
    default:
      return state
  }
}

export default socialCase
