import protocolsTypes from '../types/protocols'

const initialState = {
  list: [],
  moduleList: []
}

const protocolsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case protocolsTypes.GET_PROTOCOLS:
      return { ...state, list: payload }
    case protocolsTypes.GET_MODULE_PROTOCOLS:
      return { ...state, moduleList: payload }

    default:
      return state
  }
}

export default protocolsReducer
