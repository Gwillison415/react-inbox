import React, { Component } from "react";
import {  bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  sendMessage,
} from '../actions/messageActions';
// class MessageComposer extends Component {
const MessageComposer = ({ sendMessage })=> {

  const submitForm = (event) => {
    event.preventDefault();
    // console.log("COMPOSER _ > HITS submitForm");
    sendMessage({
      subject : event.target.subject.value,
      body : event.target.body.value
    })
  }



  // render() {
  //   const message = this.props.subject ? "Compose Message" : "";


    return (
      <form className="form-horizontal well" onSubmit={submitForm} >
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>
              Compose Message
              {/* {message} */}
            </h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">
            Subject
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">
            Body
          </label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>
    );
  }
// }

// const mapStateToProps = state => {
//   return {
//     messages: state.messages.messages,}
// };
const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
}, dispatch);
export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps,
)(MessageComposer);
