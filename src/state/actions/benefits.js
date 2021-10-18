import benefitsTypes from '../types/benefits'
// import config from '../../config'

const updateCreate = (form) => (dispatch) =>
  dispatch({ type: benefitsTypes.BENEFIT_UPDATE_CREATE, payload: form })

const benefitsActions = {
  updateCreate
}

export default benefitsActions
