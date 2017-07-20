import React, { Component } from 'react';
import Toolbar from './Toolbar'
import Messages from './Messages'
import ComposeMessage from './ComposeMessage'
import {
  getMessages,
  toggleSelect,
  toggleStar,
  markAsRead,
  markAsUnread,
  deleteMessages,
  toggleSelectAll,
  applyLabel,
  removeLabel,
  toggleCompose,
  sendMessage,
} from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.getMessages()
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">React Inbox</a>
            </div>
          </div>
        </div>

        <div className="container">
          <Toolbar
            messages={this.props.messages}
            markAsRead={this.props.markAsRead}
            markAsUnread={this.props.markAsUnread}
            deleteMessages={this.props.deleteMessages}
            toggleSelectAll={this.props.toggleSelectAll}
            applyLabel={this.props.applyLabel}
            removeLabel={this.props.removeLabel}
            toggleCompose={this.props.toggleCompose}
            />

          {
            this.props.composing ?
              <ComposeMessage sendMessage={ this.props.sendMessage } /> :
              null
          }

          <Messages
            messages={this.props.messages}
            toggleSelect={this.props.toggleSelect}
            toggleStar={this.props.toggleStar}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  composing: state.messages.composing,
  messages: state.messages.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages,
  toggleSelect,
  toggleStar,
  markAsRead,
  markAsUnread,
  deleteMessages,
  toggleSelectAll,
  applyLabel,
  removeLabel,
  toggleCompose,
  sendMessage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
