import constructionTypes from '../types/construction'

const initialState = {
  list: []
}

const constructionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constructionTypes.GET_CONSTRUCTIONS:
      return { ...state, list: payload }

    default:
      return state
  }
}

export default constructionReducer
