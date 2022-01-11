import protocolsTypes from '../types/protocols'

const initialState = {
  list: []
}

const protocolsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case protocolsTypes.GET_PROTOCOLS:
      return { ...state, list: payload }

    default:
      return state
  }
}

export default protocolsReducer
