// import queryString from 'query-string'
import Axios from '../../Axios'
import commonTypes from '../types/commonPublic'
import config from '../../config'

const getAreas = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/areas`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.PUBLIC_GET_AREAS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
const getRegions = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.parameters}/public/regions`)
      .then((response) => {
        const { data } = response
        dispatch({ type: commonTypes.PUBLIC_GET_REGIONS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const commonPublicActions = {
  getAreas,
  getRegions
}

export default commonPublicActions
