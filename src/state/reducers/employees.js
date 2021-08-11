import employeesTypes from '../types/employees'

const initialState = {
  list: [],
  totalDocs: 0,
  employee: null
}

const employeesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case employeesTypes.GET_EMPLOYEES:
      return { ...state, list: payload }
    case employeesTypes.GET_EMPLOYEE_DETAILS:
      return { ...state, employee: payload }
    case employeesTypes.SET_EMPLOYEES_TOTAL:
      return { ...state, totalDocs: payload }
    default:
      return state
  }
}

export default employeesReducer
