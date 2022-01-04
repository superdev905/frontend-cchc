import inclusionTypes from '../types/inclusion'

const initialState = {
  list: [],
  totalPages: 0,
  inclusionCaseDetails: null
}

const inclusionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case inclusionTypes.GET_INCLUSIONCASE_DETAILS:
      return { ...state, inclusionCaseDetails: payload }

    default:
      return state
  }
}

export default inclusionReducer
