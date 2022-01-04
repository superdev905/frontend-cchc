import Axios from '../../Axios'
import inclusionTypes from '../types/inclusion'

import config from '../../config'

const getCaseDetails = (caseId) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.inclusion}/inclusion-cases/${caseId}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: inclusionTypes.GET_INCLUSIONCASE_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const inclusionActions = { getCaseDetails }
export default inclusionActions
