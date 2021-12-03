import { saveAs } from 'file-saver'
import queryString from 'query-string'
import Axios from '../../Axios'
import scheduleTypes from '../types/schedule'
import config from '../../config'

const getSchedules =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.schedule}/schedule?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: scheduleTypes.GET_SCHEDULE_LIST,
            payload: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const getSchedule = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.schedule}/schedule/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scheduleTypes.GET_SCHEDULE_DETAILS,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const downloadScheduleFile = (id, name) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.schedule}/schedule/${id}/file`, null, {
      responseType: 'arraybuffer'
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/pdf'
        })

        saveAs(blob, `${name}-${new Date().getTime()}`)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const createSchedule = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.schedule}/schedule`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getScheduleMeetings =
  (query = {}) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(
        `${config.services.schedule}/meetings?${queryString.stringify(query)}`
      )
        .then((response) => {
          const { data } = response
          dispatch({
            type: scheduleTypes.GET_SCHEDULE_MEETINGS,
            payload: data.items
          })
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createScheduleMeeting = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.schedule}/meetings`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scheduleTypes.CREATE_SCHEDULE_MEETING,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateScheduleMeeting = (id, values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.schedule}/meetings/${id}`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: scheduleTypes.UPDATE_SCHEDULE_MEETING,
          payload: data
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateProgrammedBenefit = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.schedule}/schedule-benefits/${id}`, values)
      .then((response) => {
        const { data } = response

        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const scheduleActions = {
  createSchedule,
  getSchedules,
  getSchedule,
  getScheduleMeetings,
  createScheduleMeeting,
  updateScheduleMeeting,
  updateProgrammedBenefit,
  downloadScheduleFile
}

export default scheduleActions
