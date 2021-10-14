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

const patchCourse = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.courses}/courses/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getCourse = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.courses}/courses/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: coursesTypes.GET_COURSE_DETAILS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOTECPayments =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.courses}/otec-payments?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createOTECPayment = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/otec-payments`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchOTECPayment = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.courses}/otec-payments/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getCoursesDocs =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.courses}/courses-docs?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({ type: coursesTypes.GET_COURSES_DOCS, payload: data.items })
          dispatch({
            type: coursesTypes.SET_TOTAL_COURSES_DOCS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getCourseDoc = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.courses}/courses-docs/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: coursesTypes.GET_COURSE_DOC_DETAILS, payload: data })
        resolve()
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getClasses =
  (query = {}) =>
  () =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.courses}/classes?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createClass = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/classes`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateClass = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.courses}/classes/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchClass = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.courses}/classes/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createCourseDoc = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/courses-docs`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchCourseDoc = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.courses}/courses-docs/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getExtraPayments =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.courses}/extra-payments?${queryString.stringify(
          query
        )}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: coursesTypes.GET_EXTRA_PAYMENTS,
            payload: data.items
          })
          dispatch({
            type: coursesTypes.SET_TOTAL_EXTRA_PAYMENTS,
            payload: data.total
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createExtraPayment = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/extra-payments`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const patchExtraPayment = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.patch(`${config.services.courses}/extra-payments/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const enrollEmployee = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/student/enroll`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const unenrollEmployee = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/student/unenroll`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getStudentsCourse = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.courses}/courses/${id}/students`)
      .then((response) => {
        const { data } = response
        dispatch({ type: coursesTypes.GET_STUDENTS_COURSE, payload: data })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getStudentDetails = (courseId, employeeId) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.courses}/courses/${courseId}/students/${employeeId}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createAttendance = (lectureId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.courses}/attendance/${lectureId}/`, values)
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
  patchCourse,
  getCourse,
  createOTECPayment,
  getOTECPayments,
  patchOTECPayment,
  getCoursesDocs,
  createCourseDoc,
  getCourseDoc,
  patchCourseDoc,
  getClasses,
  createClass,
  patchClass,
  updateClass,
  getExtraPayments,
  createExtraPayment,
  patchExtraPayment,
  enrollEmployee,
  unenrollEmployee,
  getStudentsCourse,
  getStudentDetails,
  createAttendance
}
