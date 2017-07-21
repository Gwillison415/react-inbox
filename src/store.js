
import { conmbineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import rootReducer from './reducers'
import {rootReducer} from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';
import {initialState} from './reducers/initialState';

const logger = (store) => (next) => action => {
  console.log('action fired', action);
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
console.log(initialState);

const middleware = [
  thunk,
  logger,
  // error,
];
 /* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  initialState,
  // CAUSES Actions must be plain objects. Use custom middleware for async actions. TODO find out if my code is isomorphic??
  applyMiddleware(...middleware),
  typeof window !== 'undefined' &&  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

// store.subscribe(() => {
//   console.log('store changed', store.getstate());
// })

export default store;

//can i apply any middleware?

// is it the case it has to do with async?
