import authTypes from '../types/auth'

const initialState = {
  isAuthenticated: true,
  rememberSession: false,
  user: {
    name: 'Franz',
    lastName: 'Ogosi',
    role: {
      name: 'ADMIN'
    }
  }
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_USER:
      return { ...state, isAuthenticated: payload }
    case authTypes.GET_AUTHENTICATED:
      return { ...state, user: payload }
    case authTypes.SET_CURRENT_USER:
      return { ...state, user: payload }
    case authTypes.LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}

export default authReducer
