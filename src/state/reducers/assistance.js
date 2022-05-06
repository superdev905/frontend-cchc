import assistanceTypes from '../types/assistance'

const initialState = {
  calendarEvents: [],
  listEvents: [],
  totalEvents: 0,
  visit: null,
  showModal: false,
  assistanceConstructionList: [],
  attendedEmployeeList: [],
  attention: null,
  listAttention: [],
  totalAttention: 0,
  employeesToAttend: [],
  calendarStats: [],
  listItems: [],
  totalUsers: 0,
  historicly: [],
  visitStatistics: []
}

const assistanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case assistanceTypes.GET_CALENDAR_EVENTS:
      return { ...state, calendarEvents: payload }
    case assistanceTypes.GET_EVENTS_LIST:
      return { ...state, listEvents: payload }
    case assistanceTypes.SET_EVENTS_TOTALS:
      return { ...state, totalEvents: payload }
    case assistanceTypes.GET_VISIT_DETAILS:
      return { ...state, visit: payload }
    case assistanceTypes.ASSISTANCE_TYPE_TOGGLE:
      return { ...state, showModal: payload }
    case assistanceTypes.GET_ASSISTANCE_CONSTRUCTION:
      return { ...state, assistanceConstructionList: payload }
    case assistanceTypes.GET_ATTENDED_EMPLOYEES:
      return { ...state, attendedEmployeeList: payload }
    case assistanceTypes.GET_PERSONAL_INTERVENTION_DETAILS:
      return { ...state, attention: payload }
    case assistanceTypes.GET_ATTENTION_LIST:
      return { ...state, listAttention: payload }
    case assistanceTypes.SET_ATTENTION_TOTALS:
      return { ...state, totalAttention: payload }
    case assistanceTypes.GET_EMPLOYEES_TO_ATTEND:
      return { ...state, employeesToAttend: payload }
    case assistanceTypes.GET_CALENDAR_STATS:
      return { ...state, calendarStats: payload }
    case assistanceTypes.GET_ITEMS:
      return { ...state, listItems: payload }
    case assistanceTypes.TOTAL_USERS:
      return { ...state, totalUsers: payload }
    case assistanceTypes.EMPLOYEE_ATTENDED_HISTORICLY:
      return { ...state, historicly: payload }
    case assistanceTypes.GET_VISIT_STATISTICS:
      return { ...state, visitStatistics: payload }

    default:
      return state
  }
}

export default assistanceReducer
