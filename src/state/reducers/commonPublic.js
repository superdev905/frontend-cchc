import commonTypes from '../types/commonPublic'

const initialState = {
  areas: []
}

const commonPublicReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.PUBLIC_GET_AREAS:
      return { ...state, areas: payload }

    default:
      return state
  }
}

export default commonPublicReducer
