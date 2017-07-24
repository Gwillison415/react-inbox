import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Toolbar from './toolbar';
import Message from './message';
import MessageComposer from './messageComposer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {initialState} from '../reducers/initialState';
import store from '../store';
import { withRouter, Route } from "react-router-dom";
import {
  getAllMessages,
  sendMessage,
  toggleStarState,

} from '../actions/messageActions.js';

class App extends Component {
/* -----------------------------------------------------------------------
                              API CAlls
  ------------------------------------------------------------------------*/

   componentDidMount(){
  //  console.log(this.props.getAllMessages.toString());
    this.props.getAllMessages();

  }


  render() {
    if (this.props.messages === undefined ) {
      return <div>Loading Inbox</div>
    }
    return (
      <div>
        <div className="Toolbar">
          <Toolbar key={1} messages={this.props.messages}
            markAsRead={this.props.markAsRead}
            markAsUnread={this.props.markAsUnread}
            deleteMessages={this.props.deleteMessages}
            toggleSelectAll={this.props.toggleSelectAll}
            applyLabel={this.props.applyLabel}
            removeLabel={this.props.removeLabel}
            showComposeMessageForm={this.props.showComposeMessageForm}/>

          <Route path ="/compose" render={props => (
            <MessageComposer sendMessage={ this.props.sendMessage }  />

          )}

          />

        </div>
        <div>
          {/* {console.log("all MESSAGES from app.js", this.props)} */}

            {this.props.fetchingMessages? <h4>loading</h4> : this.props.messages.map((message) => {
              return   <Message key={message.id} labels={message.labels} subject={message.subject} starred={message.starred} checked={message.checked}
              read={message.read}
              id={message.id}
              toggleStarState = {this.toggleStarState} toggleCheckState={this.toggleCheckState}
              toggleRead={this.toggleRead} message={message}/>
            })} }
          </div>

        <div>
          <ol>
            <h1>issues</h1>

              <li> minor - how to manipulate the state of just the lad / remove label logo so that it returns to " add / remove lable"</li>

          </ol>
          <ul>
            <h3> closed issues</h3>
            <li>  tollbarActions.js doesn't fire dispatch inside call to return dispatched object  </li>
            <li>constant re-render of page when not IFE'd from an anonymous Fn in an onClick, onChange etc</li>
            <li> state.messages.messages contains the related keys: composing, fetchingMessages and therefore I needed to map composing to props in order to access this.props.composing state </li>
            <li>put the unread messages span back inside component</li>
            <li>sendMessage prop not working causes re-render</li>
            <ul>
              <h4>fixed sendMessage by</h4>
              <li>turning into functional component</li>
              <li>fixing variable shadowing in sendMessage action</li>
              <li>then noticed newmessage.id was missing in my mapping out of the messages component NEW BUG</li>
              <li> adding thunk middleware to read max id Object.assign to max +1 STILL NEED TO DO THIS</li>
              <ul>
                <h3>possible cause</h3>
                <li>initialState not imported, returning undefined, should return false</li>
                <li>mpstp state.composing status-> undefined state.messages.composing status -> undefined</li>
                <li>THEN -- on toggle event   </li>
                <li>mpstp state.composing status-> undefined state.messages.composing status -> true</li>
              </ul>
              <li> this.props.messages.map is not a function
App.render
src/components/App.js:56 must have to do with incorrect state key assignments</li>
            </ul>
          </ul>
        </div>
        <pre>
          {JSON.stringify(this.store, null, 2)};
        </pre>
      </div>

    );
  }
}
// probably need to map state.messages.messagesByID to the object i've created to enforce the contract I have established

const mapStateToProps = state => {
  console.log('mpstp state.composing status->', state.composing, "state.messages.composing status ->", state.messages.composing, "state.messages =", state.messages, "state.messages.messages=",   state.messages.messages);
  return {

    // messagesObj : state.messages,
    messages: state.messages.messages,
    composing : state.messages.composing,
  }

}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllMessages,
  sendMessage,
  toggleStarState,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
