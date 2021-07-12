import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import ui from './ui'
import auth from './auth'
import companies from './companies'

const reducers = (history) =>
  combineReducers({
    ui,
    auth,
    companies,
    router: connectRouter(history)
  })

export default reducers
