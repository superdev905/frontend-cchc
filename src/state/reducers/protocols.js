import protocolsTypes from '../types/protocols'

const initialState = {
  list: [],
  showCreateModal: false
}

const protocolsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case protocolsTypes.GET_PROTOCOLS:
      return { ...state, list: payload }
    case protocolsTypes.PROTOCOLS_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    default:
      return state
  }
}

export default protocolsReducer
