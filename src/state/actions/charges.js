import Axios from '../../Axios'
import chargesTypes from '../types/charges'
import config from '../../config'

const getCharges = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/contact_charges`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: chargesTypes.GET_CHARGES,
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
    Axios.post(`/contact_charges`, values)
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
    Axios.put(`/contact_charges/${idCharge}`, values)
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
    Axios.delete(`/contact_charges/${idCharge}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export default {
  getCharges,
  updateCharge,
  createCharge,
  deleteCharge
}
