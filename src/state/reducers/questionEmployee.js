import questionTypes from '../types/questionEmployee'

const employeeId = window.localStorage.getItem('employeeId')

const initialState = {
  isLogged: !!employeeId,
  employeeId: employeeId || null,
  employee: null,
  questions: [],
  totalQuestions: 0
}

const questionEmployeeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case questionTypes.SET_EMPLOYEE_ID:
      return { ...state, employeeId: payload }
    case questionTypes.QE_GET_EMPLOYEE_DETAILS:
      return { ...state, employee: payload }
    case questionTypes.QE_GET_QUESTIONS:
      return { ...state, questions: payload }
    case questionTypes.QE_SET_TOTAL_QUESTIONS:
      return { ...state, totalQuestions: payload }
    case questionTypes.QE_ADD_QUESTION:
      return { ...state, questions: [{ ...payload }].concat(state.questions) }
    default:
      return state
  }
}

export default questionEmployeeReducer
