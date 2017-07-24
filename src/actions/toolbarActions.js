import React from 'react';


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

export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const deleteSelected = (messages) => {
  return (dispatch) => {
    console.log("DELETE MESSAGE DISPATCH");
    dispatch({type: DELETE_MESSAGE})

  }
}

export const MARK_UNREAD = "MARK_UNREAD";
export const markUnread = () => {
  return (dispatch) => {
    dispatch({
      type: MARK_UNREAD,
    })
  }
}
export const MARK_READ = "MARK_READ";
export const markRead = () => {
  return (dispatch) => {
    dispatch({
      type: MARK_READ,
    })
  }
}
export const TOGGLE_COMPOSE = "TOGGLE_COMPOSE"
export const showComposeMessageForm = () => {
  return dispatch => {
    dispatch({
      type : TOGGLE_COMPOSE,

    })
  }
}
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
