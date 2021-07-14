import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import ui from './ui'
import common from './common'
import auth from './auth'
import companies from './companies'

const reducers = (history) =>
  combineReducers({
    ui,
    common,
    auth,
    companies,
    router: connectRouter(history)
  })

export default reducers
