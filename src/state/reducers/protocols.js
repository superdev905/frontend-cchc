import protocolsTypes from '../types/protocols'

const initialState = {
  list: [],
  moduleList: [],
  showCreateModal: false,
  protocol: null
}

const protocolsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case protocolsTypes.GET_PROTOCOLS:
      return { ...state, list: payload }
    case protocolsTypes.GET_MODULE_PROTOCOLS:
      return { ...state, moduleList: payload }
    case protocolsTypes.PROTOCOLS_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }
    case protocolsTypes.CREATE_PROTOCOL:
      return { ...state, list: [{ ...payload }].concat(state.list) }
    case protocolsTypes.GET_PROTOCOL_DETAILS:
      return { ...state, protocol: payload }
    case protocolsTypes.UPDATE_PROTOCOL:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === payload.id ? payload : item
        )
      }
    case protocolsTypes.DELETE_PROTOCOL:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== payload)
      }

    default:
      return state
  }
}

export default protocolsReducer
