import uiTypes from '../types/ui'

const setIsMobile = (value) => (dispatch) =>
  dispatch({ type: uiTypes.SET_IS_MOBILE, payload: value })

export default {
  setIsMobile
}
