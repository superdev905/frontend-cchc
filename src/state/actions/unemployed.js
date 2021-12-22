import unemployedTypes from '../types/unemployed'

const setFilters = (value) => (dispatch) =>
  dispatch({ type: unemployedTypes.SET_FILTERS, payload: value })

const setQuery = (value) => (dispatch) =>
  dispatch({ type: unemployedTypes.SET_QUERY, payload: value })

export default {
  setFilters,
  setQuery
}
