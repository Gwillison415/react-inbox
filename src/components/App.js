import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Toolbar from './toolbar';
import Message from './message';
import MessageComposer from './messageComposer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//
// import {
//   getAllMessages,
//   sendMessage,
//   toggleStarState,
//
// } from '../actions/messsageActions'

class App extends Component {
/* -----------------------------------------------------------------------
                              API CAlls
  ------------------------------------------------------------------------*/

  async componentDidMount() {
    // await getAllMessages();

  }




//
//  toggleCompose() {
//    this.setState({composing: !this.state.composing})
//  }
//   /* -----------------------------------------------------------------------
//                               helper functions
//   ------------------------------------------------------------------------*/
//   targetMessage = (messageId) => { return this.state.list.find(message => message.id === messageId)
//   }
//
//
//   getCheckedMessages(messages){
//     return messages.filter(message => message.checked);
//   }
//   // in future refactor LOSE toggleProperty and just use toggleAllProperty because: callback is always best to avoid strange behavior
//   // NOTE without the callback in setState only my last in a list was toggled
//   toggleAllProperty(message, property){
//
//     this.setState(prevState => {
//       const index = prevState.list.indexOf(message);
//       return {
//         list: [
//           ...prevState.list.slice(0, index),
//           { ...message, [property]: !message[property] },
//           ...prevState.list.slice(index + 1)
//         ]
//       };
//     });
//
//   }
//   deleteObject(message) {
//     this.setState(prevState => {
//       const index = prevState.list.indexOf(message);
//       return {
//         list: [
//           ...prevState.list.slice(0, index),
//           ...prevState.list.slice(index + 1)
//         ]
//       };
//     });
//   }
//   toggleProperty(message, property){
//     const index = this.state.list.indexOf(message);
//
//     this.setState({
//       list: [
//         ...this.state.list.slice(0, index), // old message up to idx
//         {...message, [property] : !message[property]}, // new message
//         ...this.state.list.slice(index + 1)  // messages past new message
//       ]
//     })
//   }
//
//   /* -----------------------------------------------------------------------
//   Toolbar Functions
//   ------------------------------------------------------------------------*/
//
//   // small performance cost to calling setState multiple times
//   toggleAllRead(messages, property) {
//     messages.forEach((message) => {
//       if (!message.read) {
//         return this.toggleAllProperty(message, property)
//       }
//     });
//   }
// //whenever you're using setState that depends on old state USE A CALLBACK (as above with prevstate)
//     //if you're gonna set the new state that requires understanding of old state
//
//   toggleAllUnread(messages, property) {
//     messages.forEach((message) => {
//       if (message.read) {
//         return this.toggleAllProperty(message, property)
//       }
//     });
//   }
//
//   addNewLabel(newLabel) {
//     let selectedMessages = this.getCheckedMessages(this.state.list)
//
//     let messageWithUpdatedLabels = selectedMessages.map(message => {
//       if (!message.labels.includes(newLabel)) {
//         message.labels.push(newLabel)
//       }
//     });
//     // refactor to reflect immutability helper Fn like toggleAllProperty
//     this.setState(messageWithUpdatedLabels);
//   }
//
//
//   deleteSelectedMessages(selectedMessages) {
//       selectedMessages.forEach(message => this.deleteObject(message));
//   }
//
//   toggleAllCheckState() {
//     console.log(this.state.list.length);
//     this.state.list.forEach(message => this.toggleAllProperty(message, 'checked'));
//   }
//   /* -----------------------------------------------------------------------
//                               Message Functions
//   ------------------------------------------------------------------------*/
//   //  change to state of single message
//
//   toggleRead(messageId) {
//     let targetedMessage = this.targetMessage(messageId);
//     this.toggleProperty(targetedMessage, 'read')
//     // this.list.targetedMessage.setState({ read: !this.state.read })
//   }
//   toggleStarState(messageId){
//     let targetedMessage = this.targetMessage(messageId);
//     this.toggleProperty(targetedMessage, 'starred');
//   }
//
//   toggleCheckState(messageId) {
//     let targetedMessage = this.targetMessage(messageId);
//     this.toggleProperty(targetedMessage, 'checked');
//   }
//
//

 /* -----------------------------------------------------------------------
 Message Composer Functions
 ------------------------------------------------------------------------*/
// NOTE old code- probably deleting
 // async sendMessage(messageObj) {
 //   const response =  await this.makeAPIrequest( 'POST', {
 //     subject: messageObj.subject,
 //     body: messageObj.body,
 //   })
 //   const newMessage =  await response.json()
 //
 //   this.setState(prevState => {
 //     return {
 //       list : [
 //       ...prevState.list,
 //       newMessage
 //     ],
 //     composing: false,
 //   }})
 // }

//mangled code
// async sendMessage(messageObj) {
//   const response =  await this.makeAPIrequest( 'POST', {
//     subject: messageObj.subject,
//     body: messageObj.body,
//   })
//   const newMessage =  await response.json()
//
//
//   this.setState(prevState => {
//     return {
//       list = [...prevState.list, newMessage],
//       composing: false,
//     }
//   })
// }


 toggleCompose() {
   console.log(this.state.composing);
   this.setState({composing: !this.state.composing})
 }

  render() {

    return (
      <div>
        <div className="toolbar">
          <Toolbar key={1} list={this.state.list} toggleRead={this.toggleRead} toggleAllRead={this.toggleAllRead} toggleAllUnread={this.toggleAllUnread} addNewLabel={this.addNewLabel}
          removeOldLabel={this.removeOldLabel}
          toggleCompose={this.toggleCompose} deleteSelectedMessages={this.deleteSelectedMessages} toggleAllCheckState={this.toggleAllCheckState} toggleCompose={this.toggleCompose}/>
        </div>
        <div>
          {this.state.composing ?
            <MessageComposer sendMessage={ this.onSendMessage } list={this.state.list} /> :
             null}

        </div>
        <div>
            {this.state.list.map((message) => {
              return   <Message key={message.id} labels={message.labels} subject={message.subject} starred={message.starred} checked={message.checked}
              read={message.read}
              id={message.id}
              toggleStarState = {this.toggleStarState} toggleCheckState={this.toggleCheckState}
              toggleRead={this.toggleRead} />
            })}
          </div>

        <div>
          <ol>
            <h3>issues</h3>
            <li>    </li>
          </ol>
        </div>
        <pre>
          {JSON.stringify(this.state, null, 2)};
        </pre>
      </div>

    );
  }
}
// const mapStateToProps = state => ({
//   composing: state.messages.composing,
//   messages: state.messages.messages,
//   fetchingMessages: state.fetchingMessages,
// })
//
// const mapDispatchToProps = dispatch => bindActionCreators({
//   getAllMessages,
//   onSendMessage(messageObj) {sendMessage},
// }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
