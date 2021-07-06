import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import reducers from './reducers'

const initialState = {}

export const history = createBrowserHistory()
const middlewares = [ReduxThunk, routerMiddleware(history)]

const enhancers = []

let composedEnhancers = null
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const composeEnhancers = composeWithDevTools({ trace: true })
  composedEnhancers = composeEnhancers(
    applyMiddleware(...middlewares),
    ...enhancers
  )
} else {
  composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers)
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
  whitelist: ['routerLocations', 'auth']
}

const persistedReducer = persistReducer(persistConfig, reducers(history))

export default function configureStore() {
  const store = createStore(persistedReducer, initialState, composedEnhancers)
  const persistor = persistStore(store)
  return { store, persistor }
}
