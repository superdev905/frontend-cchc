import inclusionTypes from '../types/inclusion'

const initialState = {
  list: [],
  chargeMethods: [],
  totalPages: 0,
  inclusionCaseDetails: null
}

const inclusionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case inclusionTypes.GET_INCLUSIONCASE_DETAILS:
      return { ...state, inclusionCaseDetails: payload }
    case inclusionTypes.GET_CHARGE_METHODS:
      return { ...state, chargeMethods: payload }

    default:
      return state
  }
}

export default inclusionReducer
