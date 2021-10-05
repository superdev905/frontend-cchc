import queryString from 'query-string'
import Axios from '../../Axios'
import coursesTypes from '../types/courses'
import config from '../../config'

const getCourses =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.courses}/courses?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: coursesTypes.GET_COURSES, payload: data.items })
          dispatch({
            type: coursesTypes.SET_TOTAL_COURSES,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createCourse = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/courses`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateCourse = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.courses}/courses/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data)
      })
  })

const patchCourse = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.courses}/courses/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  getCourses,
  createCourse,
  updateCourse,
  patchCourse
}
