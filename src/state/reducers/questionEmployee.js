import questionTypes from '../types/questionEmployee'

const employeeId = window.localStorage.getItem('employeeId')

const initialState = {
  isLogged: !!employeeId,
  employeeId: employeeId || null,
  employee: null
}

const questionEmployeeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case questionTypes.SET_EMPLOYEE_ID:
      return { ...state, employeeId: payload }
    case questionTypes.QE_GET_EMPLOYEE_DETAILS:
      return { ...state, employee: payload }
    default:
      return state
  }
}

export default questionEmployeeReducer
