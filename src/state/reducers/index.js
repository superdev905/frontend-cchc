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
import benefits from './benefits'
import schedule from './schedule'
import housing from './housing'
import questionEmployee from './questionEmployee'
import socialCase from './socialCase'
import commonPublic from './commonPublic'
import questions from './questions'
import migrants from './migrants'
import unemployed from './unemployed'

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
    benefits,
    schedule,
    housing,
    questionEmployee,
    socialCase,
    commonPublic,
    questions,
    migrants,
    unemployed,
    router: connectRouter(history)
  })

export default reducers
