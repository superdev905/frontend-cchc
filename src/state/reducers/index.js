import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import ui from './ui'
import auth from './auth'

const reducers = (history) =>
  combineReducers({
    ui,
    auth,
    router: connectRouter(history)
  })

export default reducers
