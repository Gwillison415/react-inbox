
import { conmbineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import rootReducer from './reducers'
import rootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './reducers/initialState';

const logger = (store) => (next) => action => {
  console.log('action fire', action);
  next(action);
}

const error = (store) => (next) => action => {
  try {
    next(action);
  } catch(err) {
    console.log('Error MESSAGE:', err);
  }
  next(action);
}


const middleware = [
  logger,
  thunk,
  error,
]
 /* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
/* eslint-enable */
store.subscribe(() => {
  console.log('store changed', store.getstate());
})

export default store
