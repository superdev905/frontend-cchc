import benefitsTypes from '../types/benefits'

const initialState = {
  create: {
    step: 0
  }
}

const benefitsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case benefitsTypes.BENEFIT_UPDATE_CREATE:
      return { ...state, create: payload }

    default:
      return state
  }
}

export default benefitsReducers
