import Axios from '../../Axios'
import regionsTypes from '../types/regions'

const getRegions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/regions`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: regionsTypes.GET_REGIONS,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const createCharge = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`/regions`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const updateCharge = (idCharge, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/regions/${idCharge}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const deleteCharge = (idCharge) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`/regions/${idCharge}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export default {
  getRegions,
  updateCharge,
  createCharge,
  deleteCharge
}
