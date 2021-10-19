import benefitsTypes from '../types/benefits'

const initialState = {
  create: {
    step: 0
  },
  showCreateModal: false
}

const benefitsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case benefitsTypes.BENEFIT_UPDATE_CREATE:
      return { ...state, create: payload }
    case benefitsTypes.BENEFIT_TOGGLE_CREATE:
      return { ...state, showCreateModal: payload }

    default:
      return state
  }
}

export default benefitsReducers
