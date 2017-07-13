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
  }
  toggleRead(messageId, isRead) {
    let targetedMessage = this.state.list.find(message => message.id === messageId)
    this.list.targetedMessage.setState({ read: !isRead })
  }
  toggleStarState(messageId, newStarState){
    let targetedMessage = this.state.list.find(message => message.id === messageId)

    console.log('newStarState', newStarState);
    this.setState({ starred: newStarState })
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
              toggleStarState = {this.toggleStarState}/>
            })}
          </div>
        <Composer />
      </div>

    );
  }
}

export default App;
