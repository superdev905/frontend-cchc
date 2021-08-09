import assistanceTypes from '../types/assistance'

const initialState = {
  listEvents: []
}

const assistanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case assistanceTypes.GET_EVENTS:
      return { ...state, listEvents: payload }

    default:
      return state
  }
}

export default assistanceReducer
