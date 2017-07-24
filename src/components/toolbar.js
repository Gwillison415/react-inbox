import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import {
  // messageListStatusFn,
  removeOldLabel,
  unreadMessagesCount,
  AddLabel,
  deleteSelected,
  markUnread,
  markRead,
  showComposeMessageForm,
} from '../actions/toolbarActions';


class Toolbar extends Component {


  isSelected = () =>  {
       const selectedMessages1 = this.props.messages.filter(message => message.selected);
       console.log("selectedMessages1", selectedMessages1);
       return selectedMessages1;
    }
  messageListStatusFn = () => {
    let toggledMessages = this.isSelected();

    const unchecked = "fa fa-square-o";
    const someChecked = "fa fa-minus-square-o";
    const checked = "fa fa-check-square-o";

      if (toggledMessages.length === this.props.messages.length) {
        return checked;
      } else if (toggledMessages.length > 0) {
        return someChecked;
      } else if (toggledMessages.length === 0) {
        return unchecked;
      } else {
        return "fa fa-square-o";
      }
    };

  let
  render() {
    // const read = this.props.read ? " read" : "unread";
    // const subject = this.props.subject ? this.props.subject.toString() : "";
    // const starred = this.props.starred ? "fa fa-star" : "fa fa-star-o";
      const count = this.props.messages.filter(message => !message.read).length
    // const selected = this.props.selected ? "selected" : "";
    // const checked = this.props.selected ? "checked" : "";

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{count}</span>

            unread {count === 1 ? 'message' : 'messages'}
          </p>
          <Switch>
          <Route path="/compose" render={ () => (
            <Link className="btn btn-danger" to="/">
              <i className={`fa fa-plus`}></i>
            </Link>
          )} />
          <Route render={ () => (
            <Link className="btn btn-danger" to="/compose">
              <i className={`fa fa-plus`}></i>
            </Link>
          )} />
        </Switch>

          <button className="btn btn-default">
            <i className={this.messageListStatusFn()} onClick={this.toggleAddSelectedState}></i>
          </button>

          <button className="btn btn-default" onClick={() => {this.props.markRead(this.props.messages)}}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => {this.props.markUnread(this.props.messages)}}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(event) =>
            //  {console.log("EVENT ARGET", event.target.value);
           this.props.AddLabel(event.target.value)}>
            <option>Apply label</option>
            <option value="dev" >dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(event) => {
            this.props.removeOldLabel(event.target.value)}}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o" onClick={() =>{this.props.deleteSelected(this.props.messages)}}></i>
          </button>
        </div>
      </div>
    );
  }

}
// let getSelectedMessages = (this.props.messages) => {
//  const selectedMessages2 = messages.filter(message => !message.selected);
//  console.log(selectedMessages2, "selectedMessages2");
//  return selectedMessages2;
// }
const mapStateToProps = state => {
  let storeStateMessages =state.messages;
  let storeComposingState = state.composing;
  // let currentlySelectedMessages = getSelectedMessages()
  return {
    storeComposingState,
    storeStateMessages,
    deleteSelected,
    markUnread,
    markRead,
    showComposeMessageForm,
    // currentlySelectedMessages,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  // messageListStatusFn,
  removeOldLabel,
  AddLabel,
  deleteSelected,
  unreadMessagesCount,
  markUnread,
  markRead,
  showComposeMessageForm,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar))
