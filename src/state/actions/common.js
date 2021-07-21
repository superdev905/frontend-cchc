import Axios from '../../Axios'
import commonTypes from '../types/common'

const getRegions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/regions`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: commonTypes.GET_REGIONS,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getCharges = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/contact_charges`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: commonTypes.GET_CHARGES,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTypologies = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`/construction_typology`)
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
  getCharges,
  getTypologies
}
