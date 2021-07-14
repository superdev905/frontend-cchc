import contactTypes from '../types/contact'

const initialState = {
  list: []
}

const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case contactTypes.GET_BUSINESS_CONTACT:
      return { ...state, list: payload }

    default:
      return state
  }
}

export default contactReducer
