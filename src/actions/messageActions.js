// import fetch from 'unfetch';
let nextMessageID = 9;
export const MESSAGES_REQUEST_STARTED = "MESSAGES_REQUEST_STARTED";
// export const MESSAGES_REQUEST_SUCCESS = "MESSAGES_REQUEST_SUCCESS";
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';

export const getAllMessages = () => {
  // console.log('before dispatch');
  return async (dispatch) => {
    dispatch({ type: MESSAGES_REQUEST_STARTED })
    const response = await makeAPIrequest();
    // console.log('typeof response', response);
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages,
    })
  }
}

export const SHOW_FULL_MESSAGE = "SHOW_FULL_MESSAGE";
export const openMessage = (message) => {
  console.log("HITS openMessage ACTION CREATOR");
  return async dispatch => {
    let response = await fetch(message._links.self.href);
    let jsonData = await response.json();
    dispatch({
      type: SHOW_FULL_MESSAGE,
      message : message,
      responseObj: jsonData
    })
  }
}



export const STAR_MESSAGE = 'STAR_MESSAGE';
export const toggleStarState = (id) => {
  console.log('STAR_MESSAGE action happens in messageActions', id);
  return  (dispatch) => {
    // await updateMessagesList({
    //   "messageIds": [ message.id ],
    //   "command": "star",
    //   "star": message.starred
    // })

     return dispatch({
      type: STAR_MESSAGE,
      messageId: id,
    })
  }
}
export const TOGGLE_SELECT = "TOGGLE_SELECT";
export const toggleSelectedState = (id) => {
  console.log("TOGGLE_SELECT action happens, id = ", id);
  return (dispatch) => {
    return dispatch({
      type : TOGGLE_SELECT,
      messageId: id
    })
  }
}
export const TOGGLE_READ = "TOGGLE_READ";
export const toggleRead = (id) => {
  return dispatch => {
    return dispatch({
      type: TOGGLE_READ,
      messageId : id,

    })
  }
}
export const SENDING_MESSAGE_STARTED = "SENDING_MESSAGE_STARTED";
export const SUBMIT_COMPOSED_MESSAGE = "SUBMIT_COMPOSED_MESSAGE";
let sendCount = 0;
export const sendMessage = (message, history) => {
  sendCount++;
  console.log( `HITS SENDMESSAGE ${sendCount} times and nextMessageID = ${nextMessageID}`);
  return async (dispatch) => {
    dispatch({ type : SENDING_MESSAGE_STARTED, })
    let serverResponse = await makeAPIrequest("POST", {
      subject : message.subject,
      body : message.body,
    })
    let newMessage = await serverResponse.json();
    dispatch({ type : SUBMIT_COMPOSED_MESSAGE, message: newMessage, id: nextMessageID++})
    console.log(`ASYNC COMPLETE newMessage= ${newMessage} nextMessageID= ${nextMessageID}`);
    history.push('/');
  }

}
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


const updateMessagesList = (actionPayload) => {
  makeAPIrequest('POST', actionPayload)
    .then(resolvedMessages => {
      console.log("resolvedMessages in actions", resolvedMessages);
      resolvedMessages
    })
}
