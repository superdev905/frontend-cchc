import questionTypes from '../types/questionEmployee'

const employeeId = window.localStorage.getItem('employeeId')

const initialState = {
  isLogged: !!employeeId,
  employeeId: employeeId || null,
  employee: null,
  questions: [],
  totalQuestions: 0,
  question: null,
  historyQuestions: [],
  historyTotal: 0,
  employeeContact: null
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
    case questionTypes.QE_GET_QUESTION_DETAILS:
      return { ...state, question: payload }
    case questionTypes.QE_GET_HISTORY_QUESTIONS:
      return { ...state, historyQuestions: payload }
    case questionTypes.QE_SET_HISTORY_TOTAL_QUESTIONS:
      return { ...state, historyTotal: payload }
    case questionTypes.QE_GET_EMPLOYEE_CONTACT:
      return { ...state, employeeContact: payload }
    default:
      return state
  }
}

export default questionEmployeeReducer
