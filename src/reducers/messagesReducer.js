import {applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { toggleProperty } from '../actions/index';
import {initialState} from '../reducers/initialState';
import {
    STAR_MESSAGE,
    MESSAGES_REQUEST_STARTED,
    MESSAGES_RECEIVED,
    TOGGLE_SELECT,
    TOGGLE_READ,

} from '../actions/messageActions'

import {
  REMOVE_LABEL_FROM_MESSAGE,
  ADD_LABEL_FROM_MESSAGE,
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
            ...message,
            labels: [
              ...message.labels.slice(0, msgIndex),
              ...message.labels.slice(msgIndex + 1)
            ]
          }
        }
        return message;
      })
    }
    case ADD_LABEL_FROM_MESSAGE:
    return {
      ...state,
      messages: state.messages.map(message => {
        const msgIndex = message.labels.indexOf(action.label)
        if (message.selected && msgIndex > -1) {
          return {
            ...message,
            labels: [
              {...message, labels:[...message.labels, action.label].sort()}
            ]
          }
        }
      })
    }
    case TOGGLE_SELECT:
    console.log('makes it to TOGGLE_SELECT reducer');
    return {
      ...state,
      messages: toggleProperty(state.messages, action.messageId, 'selected')
    }

    case STAR_MESSAGE:
    console.log('makes it to STAR_MESSAGE reducer');
    return {
      ...state,
      messages: toggleProperty(state.messages, action.messageId, 'starred'),
    }
    case TOGGLE_READ:
    console.log('the property to toggle', state.messages[action.messageId - 1])
    return {
      ...state,
      messages: toggleProperty(state.messages, action.messageId, 'read'),
    }
    default:

    return {
    ...state,
  }
  }
}

const toggleProperty = (messages, messageId, property) => {
  const individualMessage = messages.filter(message => message.id === messageId)[0]
  const index = messages.indexOf(individualMessage)
  return [
    ...messages.slice(0, index),
    { ...individualMessage, [property]: !individualMessage[property] },
    ...messages.slice(index + 1),
  ]
}
