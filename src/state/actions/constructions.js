import queryString from 'query-string'
import Axios from '../../Axios'
import constructionTypes from '../types/construction'

const getConstructionTypology = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`/construction_typology?${queryString.stringify(query)}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: constructionTypes.GET_CONSTRUCTIONS,
          payload: data
        })

        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })

const createConstruction = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/constructions', values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })
const createConstructionTypology = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/construction_typology', values)
      .then((response) => {
        const { data } = response
        resolve(data.data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

export default {
  createConstruction,
  createConstructionTypology,
  getConstructionTypology
}
