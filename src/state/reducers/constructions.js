import constructionTypes from '../types/construction'

const initialState = {
  list: [],
  typologies: [],
  sectors: [],
  construction: null,
  contacts: [],
  filters: {
    skip: 0,
    limit: 20,
    search: ''
  }
}

const constructionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constructionTypes.GET_CONSTRUCTIONS:
      return { ...state, list: payload }
    case constructionTypes.GET_CONSTRUCTIONS_TYPOLOGIES:
      return { ...state, typologies: payload }
    case constructionTypes.GET_CONSTRUCTIONS_ECONOMIC_SECTOR:
      return { ...state, sectors: payload }
    case constructionTypes.GET_CONSTRUCTION_DETAILS:
      return { ...state, construction: payload }
    case constructionTypes.GET_CONSTRUCTIONS_CONTACTS:
      return { ...state, contacts: payload }
    case constructionTypes.CONSTRUCTIONS_UPDATE_FILTERS:
      return { ...state, filters: payload }

    default:
      return state
  }
}

export default constructionReducer
