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
      list : []
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
  // instantiate server data

  async componentDidMount() {
    const response = await this.makeAPIrequest()
    const json = await response.json()
    console.log(json, "JSON");
    this.setState({list: json._embedded.messages})
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
//whenever you're using setState that depends on old state USE A CALLBACK (as above with prevstate)
    //if you're gonna set the new state that requires understanding of old state
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

  async sendMessage(message) {
    const response =  await this.makeAPIrequest( 'POST', {
      subject: message.subject,
      body: message.body,
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

  render() {

    return (
      <div>
        <div className="toolbar">
          <Toolbar key={1} list={this.state.list} toggleRead={this.toggleRead} toggleAllRead={this.toggleAllRead} toggleAllUnread={this.toggleAllUnread} addNewLabel={this.addNewLabel}
          removeOldLabel={this.removeOldLabel}
          toggleCompose={this.toggleCompose} deleteSelectedMessages={this.deleteSelectedMessages} toggleAllCheckState={this.toggleAllCheckState}/>
        </div>
        {this.state.composing ?
              <MessageComposer sendMessage={ this.sendMessage } /> :
              null
          }
          <div>
            {this.state.list.map((message) => {
              return   <Message key={message.id} labels={message.labels} subject={message.subject} starred={message.starred} checked={message.checked}
              read={message.read}
              id={message.id}
              toggleStarState = {this.toggleStarState} toggleCheckState={this.toggleCheckState}
              toggleRead={this.toggleRead}/>
            })}
          </div>

        <div>
          <h2>ToDo's</h2>
          <p><ol>
            
            <li>compose message</li>

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
