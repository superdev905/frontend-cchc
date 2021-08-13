import assistanceTypes from '../types/assistance'

const initialState = {
  calendarEvents: [],
  listEvents: [],
  totalEvents: 0,
  visit: null
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
    default:
      return state
  }
}

export default assistanceReducer
