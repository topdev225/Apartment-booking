import { combineReducers } from 'redux'
import configureStore from '../configureStore'
import { createBrowserHistory } from 'history'

const initialState = {}
const history = createBrowserHistory()

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
  app: require('./app').reducer,
  auth: require('./auth').reducer,
  apartment: require('./apartment').reducer,
  user: require('./user').reducer
})

const store = configureStore(initialState, reducers,  history)

export { store, history }
