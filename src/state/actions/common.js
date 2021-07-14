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

export default {
  getRegions
}
