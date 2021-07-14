import commonTypes from '../types/common'

const initialState = {
  regions: [],
  charges: []
}

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.GET_REGIONS:
      return { ...state, regions: payload }

    default:
      return state
  }
}

export default commonReducer
