import uiTypes from '../types/ui'

const initialState = {
  isLoading: false,
  isMobile: false,
  isOnline: navigator.onLine,
  module: ''
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case uiTypes.SET_LOADING:
      return { ...state, isLoading: payload }
    case uiTypes.SET_IS_MOBILE:
      return { ...state, isMobile: payload }
    case uiTypes.SET_NETWORK_STATUS:
      return { ...state, isOnline: payload }
    case uiTypes.USER_MODULE:
      return { ...state, module: payload }
    default:
      return state
  }
}

export default authReducer
