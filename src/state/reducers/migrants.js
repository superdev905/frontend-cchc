import migrantsTypes from '../types/migrants'

const initialState = {
  migrantsList: [],
  totalDocs: 0,
  migrant: null,
  filters: {
    seacrh: '',
    period: '',
    page: 1,
    size: 50
  }
}

const migrantsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case migrantsTypes.GET_MIGRANTS:
      return { ...state, migrantsList: payload }
    case migrantsTypes.GET_TOTAL_MIGRANTS:
      return { ...state, totalDocs: payload }
    case migrantsTypes.SET_FILTERS:
      return { ...state, filters: payload }
    default:
      return state
  }
}

export default migrantsReducer
