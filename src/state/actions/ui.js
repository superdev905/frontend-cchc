import uiTypes from '../types/ui'

const setIsMobile = (value) => (dispatch) =>
  dispatch({ type: uiTypes.SET_IS_MOBILE, payload: value })

const setCurrentModule = (value) => (dispatch) =>
  dispatch({ type: uiTypes.USER_MODULE, payload: value })

const uiActions = {
  setIsMobile,
  setCurrentModule
}

export default uiActions
