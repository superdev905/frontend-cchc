import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import ui from './ui'
import common from './common'
import auth from './auth'
import companies from './companies'
import constructions from './constructions'
import charges from './charges'
import regions from './regions'
import employees from './employees'
import users from './users'
import assistance from './assistance'
import poll from './poll'
import scholarships from './scholarships'
import approvedScholarship from './approvedScholarship'
import courses from './courses'

const reducers = (history) =>
  combineReducers({
    ui,
    common,
    auth,
    companies,
    constructions,
    charges,
    regions,
    employees,
    users,
    assistance,
    poll,
    scholarships,
    approvedScholarship,
    courses,
    router: connectRouter(history)
  })

export default reducers
