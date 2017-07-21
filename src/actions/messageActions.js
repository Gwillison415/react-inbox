import fetch from 'unfetch';
import {
  toggleProperty,
} from './index';
import store from '../store';
export const MESSAGES_REQUEST_STARTED = "MESSAGES_REQUEST_STARTED";
// export const MESSAGES_REQUEST_SUCCESS = "MESSAGES_REQUEST_SUCCESS";
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';

export const getAllMessages = () => {
  console.log('before dispatch');
  return async (dispatch) => {
    dispatch({ type: MESSAGES_REQUEST_STARTED })
    const response = await makeAPIrequest();
    console.log('typeof response', response);
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages,
    })
  }
}

// export const getAllMessages =  () => {
//   // console.log("I AM EERE");
//   //
//     dispatch({ type: MESSAGES_REQUEST_STARTED});
//   //   console.log("middle log");
//   //   const jsonData = await makeAPIrequest();
//   //   console.log("I AM hhhhEERE", jsonData);
//   //   return dispatch ( {
//   //     type: MESSAGES_RECEIVED,
//   //     messsages : jsonData._embedded.messages
//   //   })
//
// }
// export const getAllMessages = () => {
//   console.log("I AM EERE");
//   return async (dispatch) => {
//     dispatch({ type: MESSAGES_REQUEST_STARTED});
//     console.log("middle log");
//     const jsonData = await makeAPIrequest();
//     console.log("I AM hhhhEERE", jsonData);
//     return dispatch ( {
//       type: MESSAGES_RECEIVED,
//       messsages : jsonData._embedded.messages
//     })
//   }
// }













export const MESSAGE_SEND_STARTED = 'MESSAGE_SEND_STARTED'
export const MESSAGE_SEND_COMPLETE = 'MESSAGE_SEND_COMPLETE'
export const sendMessage = (messageObj) => {
  return async (dispatch) => {
    dispatch({ type: MESSAGE_SEND_STARTED})
    const response =  await makeAPIrequest( 'POST', {
      subject: messageObj.subject,
      body: messageObj.body,
    })
    const newMessage =  await response.json()

    const messages = [...this.state.messages, newMessage]
    dispatch({
      type: MESSAGE_SEND_COMPLETE,
      messages: newMessage,
    })
  }
}



export const STAR_MESSAGE = 'STAR_MESSAGE';
export const toggleStarState = (message) => {
  return async (dispatch) => {
    await updateMessagesList({
      "messageIds": [ message.id ],
      "command": "star",
      "star": message.starred
    })

    dispatch({
      type: STAR_MESSAGE,
      message: message,
    })
  }
}
// const makeAPIrequest = (method = 'GET', body = null) => {
// const BASE_URL =  'http://localhost:8181/api/messages';
//  if (body) {body = JSON.stringify(body)}
//  fetch(BASE_URL, {
//    method: method,
//    headers: {
//      'Content-Type': 'application/json',
//      'Accept': 'application/json',
//    },
//    body: body
//  })
//  .then(response => {
//    console.log('response status', response.status, typeof response);
//    if (response.status !== 200) {
//       console.log('Looks like there was a problem. Status Code: ' +   response.status);
//     }
//     return response;
//  })
//  .catch(err => err);
// }
const makeAPIrequest = async (method = 'GET', body = null) => {
const BASE_URL =  'http://localhost:8181/api/messages';
 if (body) {body = JSON.stringify(body)}
 return  await fetch(BASE_URL, {
   method: method,
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
   },
   body: body
 })
}

const updateMessagesList = (actionPayload) => {
  makeAPIrequest('POST', actionPayload)
    .then(resolvedMessages => resolvedMessages)
}
