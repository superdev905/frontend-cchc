import queryString from 'query-string'
import Axios from '../../Axios'
import benefitsTypes from '../types/benefits'
import config from '../../config'

const updateCreate = (form) => (dispatch) =>
  dispatch({ type: benefitsTypes.BENEFIT_UPDATE_CREATE, payload: form })

const createBenefit = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.benefits}/benefits`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getBenefits =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.benefits}/benefits?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: benefitsTypes.GET_BENEFITS, payload: data.items })
          dispatch({
            type: benefitsTypes.SET_TOTAL_BENEFITS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getBenefitDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.benefits}/benefits/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: benefitsTypes.GET_BENEFIT_DETAILS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteBenefit = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.benefits}/benefits/${id}`)
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
  createBenefit,
  getBenefits,
  getBenefitDetails,
  deleteBenefit
}

export default benefitsActions
