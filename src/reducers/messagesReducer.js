import {applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { toggleProperty } from '../actions/index';
import {initialState} from '../reducers/initialState';
import {
    STAR_MESSAGE,
    MESSAGES_REQUEST_STARTED,
    MESSAGES_RECEIVED,


} from '../actions/messageActions'

import {
  REMOVE_LABEL_FROM_MESSAGE,

} from '../actions/toolbarActions';
// const initialState = {
//   messages: [],
//   fetchingMessages: true,
//   creatingMessage: false,
//   composing: false,
// };



export const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case MESSAGES_RECEIVED: return {
      ...state,
      messages: action.messages,
      // fetchingMessages: false,
    }
    case MESSAGES_REQUEST_STARTED :
    return {
      ...state,
      fetchingMessages: true,
    }
    case REMOVE_LABEL_FROM_MESSAGE:
    return {
      ...state,
      messages: state.messages.map( message => {
        const msgIndex = message.labels.indexOf(action.label)
        if (message.selected && msgIndex > -1) {
          return {
            ...state.messages,
            labels: [
              ...state.messages.labels.slice(0, msgIndex),
              ...state.messages.labels.slice(msgIndex + 1)
            ]
          }
        }
        return message;
      })
    }
    case STAR_MESSAGE:
    return {
      ...state,
      messages: toggleProperty(state.messages, action.message, 'starred')
    }
    default:
    return {
      state,
    }
  }
}
