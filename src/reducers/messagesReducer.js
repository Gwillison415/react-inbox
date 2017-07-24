// import {applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import { toggleProperty } from '../actions/index';
import {initialState} from '../reducers/initialState';
import {
    STAR_MESSAGE,
    MESSAGES_REQUEST_STARTED,
    MESSAGES_RECEIVED,
    TOGGLE_SELECT,
    TOGGLE_READ,
    SUBMIT_COMPOSED_MESSAGE,
    SENDING_MESSAGE_STARTED,
} from '../actions/messageActions'

import {
  REMOVE_LABEL_FROM_MESSAGE,
  ADD_LABEL_FROM_MESSAGE,
  DELETE_MESSAGE,
  MARK_UNREAD,
  MARK_READ,
  TOGGLE_COMPOSE,
} from '../actions/toolbarActions';
// const initialState = {
//   messages: [],
//   fetchingMessages: true,
//   creatingMessage: false,
//   composing: false,
// };


console.log("initialState passed to reducer", initialState);
export const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case MESSAGES_RECEIVED: return {
      ...state,
      messages: action.messages,
      fetchingMessages: false,
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
      messages:state.messages.map(message => (
          message.selected && !message.labels.includes(action.label) ?
            { ...message, labels: [...message.labels, action.label].sort() } :
            message
        ))
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
    case DELETE_MESSAGE:
    return {
      ...state,
      messages: state.messages.filter(message => !message.selected)

    }
    case MARK_READ:
    return {
      ...state,
      messages: state.messages.map(message => message.selected? {...message, read: true}: message)
    }
    case MARK_UNREAD:
    return {
      ...state,
      messages: state.messages.map(message => message.selected? {...message, read: false} : message)

    }
    case TOGGLE_COMPOSE:
    return {
      ...state,
      composing : !state.composing,

    }
    case SENDING_MESSAGE_STARTED :
    return {
      ...state,
      creatingNewMessage : true,
      composing: false,
    }
    case SUBMIT_COMPOSED_MESSAGE:

    return {
      ...state,
      messages: [...state.messages, action.message],
      //  [action.message] : {action.id}
      // },
      creatingNewMessage: false,
    }
    default:

    return {
      state,
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
