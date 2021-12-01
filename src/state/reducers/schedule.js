import scheduleTypes from '../types/schedule'

const initialState = {
  list: [],
  totalPages: 0,
  scheduleDetails: null,
  meetings: []
}

const scheduleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case scheduleTypes.GET_SCHEDULE_LIST:
      return { ...state, list: payload }
    case scheduleTypes.GET_SCHEDULE_DETAILS:
      return { ...state, scheduleDetails: payload }
    case scheduleTypes.GET_SCHEDULE_MEETINGS:
      return { ...state, meetings: payload }
    case scheduleTypes.CREATE_SCHEDULE_MEETING:
      return { ...state, meetings: [...[payload].concat(state.meetings)] }
    case scheduleTypes.UPDATE_SCHEDULE_MEETING:
      return {
        ...state,
        meetings: state.meetings.map((item) =>
          item.id === payload.id ? payload : item
        )
      }
    default:
      return state
  }
}

export default scheduleReducer
