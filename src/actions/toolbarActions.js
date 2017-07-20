import {
  toggleProperty,

} from '../actions/index';
import store from '../store';
export const REMOVE_LABEL_FROM_MESSAGE = "REMOVE_LABEL_FROM_MESSAGE";
export const removeOldLabel = ((oldLabel) =>  {

  return async (dispatch) => {
    dispatch({type: REMOVE_LABEL_FROM_MESSAGE, oldLabel})
  }

});
// export const removeOldLabel = ((getCheckedMessages(store.messages.selected), oldLabel) =>  {
//
//   return async (dispatch) => {
//     dispatch({type: REMOVE_LABEL_FROM_MESSAGE, oldLabel})
//   }
//
// });


const getCheckedMessages = (selectedMessages) => {
  return selectedMessages.filter(message => message.checked);
}
