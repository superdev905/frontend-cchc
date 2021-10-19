// import queryString from 'query-string'
import Axios from '../../Axios'
import benefitsTypes from '../types/benefits'
import config from '../../config'

const updateCreate = (form) => (dispatch) =>
  dispatch({ type: benefitsTypes.BENEFIT_UPDATE_CREATE, payload: form })

const toggleCreateModal = (value) => (dispatch) =>
  dispatch({
    type: benefitsTypes.BENEFIT_TOGGLE_CREATE,
    payload: !value
  })

const createBenefit = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.benefit}/benefits`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteBenefits = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.benefit}/benefits/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const benefitsActions = {
  updateCreate,
  toggleCreateModal,
  createBenefit,
  deleteBenefits
}

export default benefitsActions
