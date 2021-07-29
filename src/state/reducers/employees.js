import employeesTypes from '../types/employees'

const initialState = {
  list: [],
  employee: null
}

const employeesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case employeesTypes.GET_EMPLOYEES:
      return { ...state, list: payload }
    case employeesTypes.GET_EMPLOYEE_DETAILS:
      return { ...state, employee: payload }
    default:
      return state
  }
}

export default employeesReducer
