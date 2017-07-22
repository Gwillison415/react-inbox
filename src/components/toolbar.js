import React, { Component } from 'react';
import {messageListStatusFn, removeOldLabel, unreadMessagesCount, AddLabel} from '../actions/toolbarActions';

import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Toolbar extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }
  // console.log(this.props);
  //finds messsages where messages have been checked


  // readMessagesCount() {
  //   let readMessagesCount = this.props.list.filter(message => message.read);
  //   return readMessagesCount.length;
  // }
  // selectedMessagesCount() {
  //   let selectedMessagesCount = this.props.list.filter(message => message.selected);
  //   return selectedMessagesCount.length;
  // }

  // showComposeMessageForm = () => {
  //   console.log('compose toggeled from toolbar');
  //   this.props.toggleCompose();
  // }




    //finds all messages where messages are checked
  // markRead = () => {
  //   let checkedMessages = this.isChecked();
  //
  //   this.props.toggleAllRead(checkedMessages, 'read')
  // }
  // markUnread = () => {
  //   let checkedMessages = this.isChecked();
  //   this.props.toggleAllUnread(checkedMessages, 'read')
  // }
  //
  // AddLabel = (event) => {
  //     this.props.addNewLabel(event);
  // }
  // removeLabel = (event) => {
  //     // console.log(event);
  //     this.props.removeOldLabel(event);
  // }
  //
  // deleteSelected = () => {
  //   let selectedMessages = this.isChecked();
  //   this.props.deleteSelectedMessages(selectedMessages)
  // }
  //
  // toggleAddSelectedState = () => {
  //   this.props.toggleAllCheckState();
  // }

  render() {
    const read = this.props.read ? " read" : "unread";
    const subject = this.props.subject ? this.props.subject.toString() : "";
    const starred = this.props.starred ? "fa fa-star" : "fa fa-star-o";
    const selected = this.props.selected ? "selected" : "";
    const checked = this.props.selected ? "checked" : "";

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            {this.props.unreadMessagesCount}
          </p>
          <a className="btn btn-danger">
            <i className="fa fa-plus" onClick={this.props.showComposeMessageForm}></i>
          </a>
          <button className="btn btn-default">
            <i className={this.messageListStatusFn} onClick={this.toggleAddSelectedState}></i>
          </button>

          <button className="btn btn-default" onClick={this.markRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.markUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(event) => {this.props.AddLabel(event.target.value)}}>
            <option>Apply label</option>
            <option value="dev" >dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(event) => {this.props.removeOldLabel(event.target.value)}}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o" onClick={this.deleteSelected}></i>
          </button>
        </div>
      </div>
    );
  }

}
const mapStateToProps = state => {
  return {
    messages : state.messages,
    composing : state.composing,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  messageListStatusFn,
  removeOldLabel,
  AddLabel,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
