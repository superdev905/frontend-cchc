import housingTypes from '../types/housing'

const initialState = {
  agreementList: [],
  totalAgreements: 0,
  agreementDetails: null,
  employees: [],
  totalEmployees: 0,
  employeeData: null
}

const housingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case housingTypes.GET_AGREEMENTS:
      return { ...state, agreementList: payload }
    case housingTypes.SET_TOTAL_AGREEMENTS:
      return { ...state, totalAgreements: payload }
    case housingTypes.GET_AGREEMENT_DETAILS:
      return { ...state, agreementDetails: payload }
    case housingTypes.GET_AGREEMENT_EMPLOYEES:
      return { ...state, employees: payload }
    case housingTypes.SET_TOTAL_AGREEMENT_EMPLOYEES:
      return { ...state, totalEmployees: payload }
    case housingTypes.GET_HOUSING_EMPLOYEE_DETAILS:
      return { ...state, employeeData: payload }
    case housingTypes.UPDATE_EMPLOYEE_SAVING:
      return {
        ...state,
        employeeData: {
          ...state.employeeData
        }
      }
    default:
      return state
  }
}

export default housingReducer
