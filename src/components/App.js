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

  }

  /* -----------------------------------------------------------------------
                              helper functions
  ------------------------------------------------------------------------*/
  targetMessage = (messageId) => { return this.state.list.find(message => message.id === messageId)}






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
                              Message Functions
  ------------------------------------------------------------------------*/
  //  change to state of single message
  toggleRead(messageId) {
    let targetedMessage = this.targetMessage(messageId);
    this.list.targetedMessage.setState({ read: !this.state.read })
  }
  toggleStarState(messageId, StarState){
    let targetedMessage = this.targetMessage(messageId);
    this.toggleProperty(targetedMessage, StarState);
  }

  toggleCheckState(newCheckedState) {
    this.setState({checked: newCheckedState});
  }
  render() {

    return (
      <div>
        <div className="toolbar">
          <Toolbar key={1} list={this.state.list} toggleRead={this.toggleRead}/>
        </div>
          <div>
            {this.state.list.map((message) => {
              return   <Message key={message.id} labels={message.labels} message={message.message} starred={message.starred} checked={message.checked}
              read={message.read}
              id={message.id}
              toggleStarState = {this.toggleStarState} toggleCheckState={this.toggleCheckState}/>
            })}
          </div>
        <Composer />
      </div>

    );
  }
}

export default App;
