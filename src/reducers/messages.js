import {
  MESSAGES_REQUEST_STARTED,
  MESSAGES_REQUEST_SUCCESS,
  MESSAGE_SELECTED,
  MESSAGE_STARRED,
  MESSAGES_MARKED_AS_READ,
  MESSAGES_MARKED_AS_UNREAD,
  MESSAGES_DELETED,
  MESSAGES_TOGGLE_SELECT_ALL,
  MESSAGES_TOGGLE_COMPOSING,
  MESSAGES_APPLY_LABEL,
  MESSAGES_REMOVE_LABEL,
  MESSAGE_SEND_STARTED,
  MESSAGE_SEND_COMPLETE,
} from '../actions'

const initialState = {
  messages: [],
  fetchingMessages: true,
  creatingMessage: false,
  composing: false,
}

export default (state = initialState, action) => {

  switch (action.type) {
    case MESSAGES_REQUEST_STARTED:
      return {
        ...state,
        fetchingMessages: true,
      }
    case MESSAGES_REQUEST_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      }
    case MESSAGE_SELECTED:
      return {
        ...state,
        messages: toggleProperty(state.messages, action.message, 'selected')
      }
    case MESSAGE_STARRED:
      return {
        ...state,
        messages: toggleProperty(state.messages, action.message, 'starred')
      }
    case MESSAGES_MARKED_AS_READ:
      return {
        ...state,
        messages: state.messages.map(message => (
          message.selected ? { ...message, read: true } : message
        ))
      }
    case MESSAGES_MARKED_AS_UNREAD:
      return {
        ...state,
        messages: state.messages.map(message => (
          message.selected ? { ...message, read: false } : message
        ))
      }
    case MESSAGES_DELETED:
      return {
        ...state,
        messages: state.messages.filter(message => !message.selected),
      }
    case MESSAGES_TOGGLE_SELECT_ALL:
      const selectedMessages = state.messages.filter(message => message.selected)
      const selected = selectedMessages.length !== state.messages.length
      return {
        ...state,
        messages: state.messages.map(message => (
          message.selected !== selected ? { ...message, selected } : message
        ))
      }
    case MESSAGES_TOGGLE_COMPOSING:
      return {
        ...state,
        composing: !state.composing,
      }
    case MESSAGES_APPLY_LABEL:
      return {
        ...state,
        messages: state.messages.map(message => (
          message.selected && !message.labels.includes(action.label) ?
            { ...message, labels: [...message.labels, action.label].sort() } :
            message
        ))
      }
    case MESSAGES_REMOVE_LABEL:
      return {
        ...state,
        messages: state.messages.map(message => {
          const index = message.labels.indexOf(action.label)
          if (message.selected && index > -1) {
            return {
              ...message,
              labels: [
                ...message.labels.slice(0, index),
                ...message.labels.slice(index + 1)
              ]
            }
          }
          return message
        }),
      }
    case MESSAGE_SEND_STARTED:
      return {
        ...state,
        creatingMessage: true,
      }
    case MESSAGE_SEND_COMPLETE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message,
        ],
        composing: false,
        creatingMessage: false,
      }
    default:
      return state
  }

}

function toggleProperty(messages, message, property) {
  const index = messages.indexOf(message)
  return [
    ...messages.slice(0, index),
    { ...message, [property]: !message[property] },
    ...messages.slice(index + 1),
  ]
}
