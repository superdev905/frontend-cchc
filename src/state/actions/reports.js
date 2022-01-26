import queryString from 'query-string'
import Axios from '../../Axios'
import questionsTypes from '../types/questions'
import config from '../../config'

//  Falta backend de Stats de reportes

const getStats = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.question}/stats/general?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({ type: questionsTypes.GET_GENERAL_STATS, payload: data })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const reportsActions = {
  getStats
}

export default reportsActions
