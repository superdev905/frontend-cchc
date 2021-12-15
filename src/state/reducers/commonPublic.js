import commonTypes from '../types/commonPublic'

const initialState = {
  areas: [],
  regions: []
}

const commonPublicReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.PUBLIC_GET_AREAS:
      return { ...state, areas: payload }
    case commonTypes.PUBLIC_GET_REGIONS:
      return { ...state, regions: payload }

    default:
      return state
  }
}

export default commonPublicReducer
