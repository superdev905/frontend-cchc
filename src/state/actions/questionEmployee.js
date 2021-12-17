import queryString from 'query-string'
import Axios from '../../Axios'
import config from '../../config'
import questionEmpTypes from '../types/questionEmployee'

const validateRut = (body) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.employee}/public/employee/validate`, body)
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.SET_EMPLOYEE_ID,
          payload: data.employeeId
        })
        window.localStorage.setItem('employeeId', data.employeeId)
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const logOutEmployee = () => (dispatch) => {
  dispatch({ type: questionEmpTypes.SET_EMPLOYEE_ID, payload: null })
  window.localStorage.removeItem('employeeId')
}

const getEmployeeDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.employee}/public/employee/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.QE_GET_EMPLOYEE_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createQuestion = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.question}/employee/questions`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.QE_ADD_QUESTION,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getQuestions = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.question}/employee/questions?${queryString.stringify(
        query
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.QE_GET_QUESTIONS,
          payload: data.items
        })
        dispatch({
          type: questionEmpTypes.QE_SET_TOTAL_QUESTIONS,
          payload: data.total
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getHistoryQuestions = (query) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.question
      }/employee/questions/history?${queryString.stringify(query)}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.QE_GET_HISTORY_QUESTIONS,
          payload: data.items
        })
        dispatch({
          type: questionEmpTypes.QE_SET_HISTORY_TOTAL_QUESTIONS,
          payload: data.total
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getQuestionDetails = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.question}/employee/questions/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: questionEmpTypes.QE_GET_QUESTION_DETAILS,
          payload: data
        })

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const questionEmployeeActions = {
  validateRut,
  getEmployeeDetails,
  logOutEmployee,
  createQuestion,
  getQuestions,
  getQuestionDetails,
  getHistoryQuestions
}

export default questionEmployeeActions
