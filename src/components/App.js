import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Toolbar from './toolbar';
import Message from './message';
import Composer from './messageComposer';
import list from '../seedData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
    };
    this.toggleStarState = this.toggleStarState.bind(this);
    this.toggleCheckState = this.toggleCheckState.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
    this.toggleAllRead = this.toggleAllRead.bind(this);
    this.toggleAllProperty = this.toggleAllProperty.bind(this);
    this.toggleAllUnread = this.toggleAllUnread.bind(this);
    this.getCheckedMessages = this.getCheckedMessages.bind(this);
    this.addNewLabel = this.addNewLabel.bind(this);
  }

  /* -----------------------------------------------------------------------
                              helper functions
  ------------------------------------------------------------------------*/
  targetMessage = (messageId) => { return this.state.list.find(message => message.id === messageId)
  }


  getCheckedMessages(messages){
    return messages.filter(message => message.checked);
  }

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
  removeOldLabel(newLabel) {
    let selectedMessages = this.getCheckedMessages(this.state.list)
    console.log(selectedMessages);
    let messageWithUpdatedLabels = selectedMessages.map(message => {
      if (!message.labels.includes(newLabel)) {
      message.labels.push(newLabel)
    }
    });
    // refactor to reflect immutability helper Fn like toggleAllProperty
    this.setState(messageWithUpdatedLabels);
  }
  render() {

    return (
      <div>
        <div className="toolbar">
          <Toolbar key={1} list={this.state.list} toggleRead={this.toggleRead} toggleAllRead={this.toggleAllRead} toggleAllUnread={this.toggleAllUnread} addNewLabel={this.addNewLabel}
          removeOldLabel={this.removeOldLabel}/>
        </div>
          <div>
            {this.state.list.map((message) => {
              return   <Message key={message.id} labels={message.labels} message={message.message} starred={message.starred} checked={message.checked}
              read={message.read}
              id={message.id}
              toggleStarState = {this.toggleStarState} toggleCheckState={this.toggleCheckState}
              toggleRead={this.toggleRead}/>
            })}
          </div>
        <Composer />
        <div>
          <h2>ToDo's</h2>
          <p><ol>
            <li>check all button top left</li>
            <li>apply label</li>
            <li>remove label</li>
          </ol></p>
        </div>
      </div>

    );
  }
}

export default App;
