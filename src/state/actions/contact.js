import Axios from '../../Axios'

const createContact = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post('/business_contacts', values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`/business_contacts/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteContact = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`/business_contacts/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

export default {
  createContact,
  updateContact,
  deleteContact
}
