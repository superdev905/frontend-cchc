import employeesTypes from '../types/employees'

const initialState = {
  list: []
}

const employeesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case employeesTypes.GET_EMPLOYEES:
      return { ...state, list: payload }
    default:
      return state
  }
}

export default employeesReducer
