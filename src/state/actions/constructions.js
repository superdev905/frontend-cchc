import Axios from '../../Axios'

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
  createConstructionTypology
}
