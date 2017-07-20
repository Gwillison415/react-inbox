import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Toolbar from './toolbar';
import Message from './message';
import MessageComposer from './messageComposer';
import list from '../seedData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      composing : false,
    };
    this.toggleStarState = this.toggleStarState.bind(this);
    this.toggleCheckState = this.toggleCheckState.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
    this.toggleAllRead = this.toggleAllRead.bind(this);
    this.toggleAllProperty = this.toggleAllProperty.bind(this);
    this.toggleAllUnread = this.toggleAllUnread.bind(this);
    this.getCheckedMessages = this.getCheckedMessages.bind(this);
    this.addNewLabel = this.addNewLabel.bind(this);
    this.removeOldLabel = this.removeOldLabel.bind(this);
    this.toggleCompose = this.toggleCompose.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.deleteSelectedMessages = this.deleteSelectedMessages.bind(this);
    this.deleteObject = this.deleteObject.bind(this);
    this.toggleAllCheckState =this.toggleAllCheckState.bind(this);
  }
  // I'm fully aware that I bind function state in parent class and utilize the implicit bind with ES6  arrow functions in child class components and that this is would violate a company style guide to use one or the other in production code. I'm doing so as to be comfortable with both and practice thinking about them within every contextualize instance of "this"

  /* -----------------------------------------------------------------------
                              API CAlls
  ------------------------------------------------------------------------*/

  async componentDidMount() {
    const response = await this.makeAPIrequest()
    const json = await response.json()
    console.log(json, "JSON");
    this.setState({list: json._embedded.messages})
  }

  async makeAPIrequest(method = 'GET', body = null) {
  const BASE_URL =  'http://localhost:8181/api/messages'
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

 async sendMessage(messageObj) {
   const response =  await this.makeAPIrequest( 'POST', {
     subject: messageObj.subject,
     body: messageObj.body,
   })
   const newMessage =  await response.json()

   const messages = [...this.state.messages, newMessage]
   this.setState({
     messages,
     composing: false,
   })
 }

 toggleCompose() {
   this.setState({composing: !this.state.composing})
 }
  /* -----------------------------------------------------------------------
                              helper functions
  ------------------------------------------------------------------------*/
  targetMessage = (messageId) => { return this.state.list.find(message => message.id === messageId)
  }


  getCheckedMessages(messages){
    return messages.filter(message => message.checked);
  }
  // in future refactor LOSE toggleProperty and just use toggleAllProperty because: callback is always best to avoid strange behavior
  // NOTE without the callback in setState only my last in a list was toggled
  toggleAllProperty(message, property){

    this.setState(prevState => {
      const index = prevState.list.indexOf(message);
      return {
        list: [
          ...prevState.list.slice(0, index),
          { ...message, [property]: !message[property] },
          ...prevState.list.slice(index + 1)
        ]
      };
    });

  }
  deleteObject(message) {
    this.setState(prevState => {
      const index = prevState.list.indexOf(message);
      return {
        list: [
          ...prevState.list.slice(0, index),
          ...prevState.list.slice(index + 1)
        ]
      };
    });
  }
  toggleProperty(message, property){
    const index = this.state.list.indexOf(message);

    this.setState({
      list: [
        ...this.state.list.slice(0, index), // old message up to idx
        {...message, [property] : !message[property]}, // new message
        ...this.state.list.slice(index + 1)  // messages past new message
      ]
    })
  }

  /* -----------------------------------------------------------------------
  Toolbar Functions
  ------------------------------------------------------------------------*/

  // small performance cost to calling setState multiple times
  toggleAllRead(messages, property) {
    messages.forEach((message) => {
      if (!message.read) {
        return this.toggleAllProperty(message, property)
      }
    });
  }
//whenever you're using setState that depends on old state USE A CALLBACK (as above with prevstate)
    //if you're gonna set the new state that requires understanding of old state

  toggleAllUnread(messages, property) {
    messages.forEach((message) => {
      if (message.read) {
        return this.toggleAllProperty(message, property)
      }
    });
  }

  addNewLabel(newLabel) {
    let selectedMessages = this.getCheckedMessages(this.state.list)

    let messageWithUpdatedLabels = selectedMessages.map(message => {
      if (!message.labels.includes(newLabel)) {
        message.labels.push(newLabel)
      }
    });
    // refactor to reflect immutability helper Fn like toggleAllProperty
    this.setState(messageWithUpdatedLabels);
  }
  removeOldLabel(oldLabel) {
    let selectedMessages = this.getCheckedMessages(this.state.list)
    console.log(selectedMessages);
    let messageWithUpdatedLabels = selectedMessages.map(message => {
      if (message.labels.includes(oldLabel)) {
        let labelIdxToRemove = message.labels.indexOf(oldLabel)
        message.labels.splice(labelIdxToRemove, 1)
      }
    });
    // refactor to reflect immutability helper Fn like toggleAllProperty
    this.setState(messageWithUpdatedLabels);
  }

  deleteSelectedMessages(selectedMessages) {
      selectedMessages.forEach(message => this.deleteObject(message));
  }

  toggleAllCheckState() {
    console.log(this.state.list.length);
    this.state.list.forEach(message => this.toggleAllProperty(message, 'checked'));
  }
  /* -----------------------------------------------------------------------
                              Message Functions
  ------------------------------------------------------------------------*/
  //  change to state of single message

  toggleRead(messageId) {
    let targetedMessage = this.targetMessage(messageId);
    this.toggleProperty(targetedMessage, 'read')
    // this.list.targetedMessage.setState({ read: !this.state.read })
  }
  toggleStarState(messageId){
    let targetedMessage = this.targetMessage(messageId);
    this.toggleProperty(targetedMessage, 'starred');
  }

  toggleCheckState(messageId) {
    let targetedMessage = this.targetMessage(messageId);
    this.toggleProperty(targetedMessage, 'checked');
  }



 /* -----------------------------------------------------------------------
 Message Composer Functions
 ------------------------------------------------------------------------*/

 async sendMessage(messageObj) {
   const response =  await this.makeAPIrequest( 'POST', {
     subject: messageObj.subject,
     body: messageObj.body,
   })
   const newMessage =  await response.json()

   this.setState(prevState => {
     return {
       list : [
       ...prevState.list,
       newMessage
     ],
     composing: false,
   }})
 }

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
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
      </div>
      <div className="toolbar">
        <Toolbar key={1} list={this.state.list} toggleRead={this.toggleRead} toggleAllRead={this.toggleAllRead} toggleAllUnread={this.toggleAllUnread} addNewLabel={this.addNewLabel}
        removeOldLabel={this.removeOldLabel}
        toggleCompose={this.toggleCompose} deleteSelectedMessages={this.deleteSelectedMessages} toggleAllCheckState={this.toggleAllCheckState} toggleCompose={this.toggleCompose}/>
      </div>
      <div>
        {this.state.composing ?
          <MessageComposer sendMessage={ this.sendMessage } list={this.state.list} /> :
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
          <h2>issues</h2>
          <p><ol>

            <li>bulk select doesn't de-select preChecked on a double tap-toggle </li>
            <ul>
              <li>onCheck then bulk check messages all get checked</li>
              <li>the bulk select again selects  all but preselected messages</li>
              <li>all good on re render - probably must pass callback to set state on
              <ol>
                <li>bulk select</li>
                <li>possibly something else</li>
              </ol></li>
            </ul>
            <li> RESOLVED - no messages displayed after send - resolved with immutable callback passed to setState </li>
          </ol></p>
        </div>
        <pre>
          {JSON.stringify(this.state, null, 2)};
        </pre>
      </div>

    );
  }
}

export default App;
