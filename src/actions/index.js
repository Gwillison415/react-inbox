 import {
    store
 } from '../store'
import toolbarActions from './toolbarActions';
import messageActions from './messageActions';

export function toggleProperty(messages, message, property) {
  const index = messages.indexOf(message)
  return [
    ...messages.slice(0, index),
    { ...message, [property]: !message[property] },
    ...messages.slice(index + 1),
  ]
}
