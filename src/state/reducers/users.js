import usersTypes from '../types/users'

const initialState = {
  usersList: [],
  user: null,
  jefaturas: []
}

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case usersTypes.GET_USERS:
      return { ...state, usersList: payload }
    case usersTypes.GET_USER:
      return { ...state, user: payload }
    case usersTypes.GET_JEFATURAS:
      return { ...state, jefaturas: payload }
    default:
      return state
  }
}

export default usersReducer
