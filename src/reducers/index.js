
import {combineReducers} from 'redux';
import {messagesReducer} from './messagesReducer.js';

export const rootReducer = combineReducers({
  messages: messagesReducer,
})
