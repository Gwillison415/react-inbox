import React, { Component } from 'react';

import {
  toggleProperty,

} from '../actions/index';
import store from '../store';

export const REMOVE_LABEL_FROM_MESSAGE = "REMOVE_LABEL_FROM_MESSAGE";

export const removeOldLabel = ((oldLabel) =>  {

  return async (dispatch) => {
    dispatch({type: REMOVE_LABEL_FROM_MESSAGE, label: oldLabel})
  }

});
export const ADD_LABEL_FROM_MESSAGE = "ADD_LABEL_FROM_MESSAGE";
export const AddLabel = ((newLabel) => {
  return async (dispatch) => {
    dispatch({type: ADD_LABEL_FROM_MESSAGE, label: newLabel})
  }
})
// export const removeOldLabel = ((getCheckedMessages(store.messages.selected), oldLabel) =>  {
//
//   return async (dispatch) => {
//     dispatch({type: REMOVE_LABEL_FROM_MESSAGE, oldLabel})
//   }
//
// });
export const messageListStatusFn = () => {
  let toggledMessages = this.isChecked();

  const unchecked = "fa fa-square-o";
  const someChecked = "fa fa-minus-square-o";
  const checked = "fa fa-check-square-o";

    if (toggledMessages.length === this.props.messages.length) {
      return checked;
    } else if (toggledMessages.length > 0) {
      return someChecked;
    } else if (toggledMessages.length === 0) {
      return unchecked;
    }
  };
export const unreadMessagesCount = () => {
    let count = this.props.messages.reduce((total, message) => {
      if (message.read === false) total++;
      return total;
    }, 0);
    return (
        <span className="badge badge">
          {count} unread messages
        </span>
      );
    };

const  isChecked = () =>  {
    return this.props.messages.filter(message => message.checked);
  }
const getCheckedMessages = (selectedMessages) => {
  return selectedMessages.filter(message => message.checked);
}
