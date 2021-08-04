import usersTypes from '../types/users'

const initialState = {
  usersList: []
}

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case usersTypes.GET_USERS:
      return { ...state, usersList: payload }
    default:
      return state
  }
}

export default usersReducer
