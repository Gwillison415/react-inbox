 import React, { Component } from 'react';
import { toggleStarState, toggleRead, toggleSelectedState } from '../actions/messageActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// <div className={"row message " + this.props.read? read : unread}>   </div>



class Message extends Component {
  constructor(props) {
    super(props);


  }

  findMessage = (event) => {
    this.props.messages.find(message => message.id === event.target.id)
  }

  // NOTE REACT CODE to refactor
  //change state of message to


  render() {
    let readState = this.props.read? 'read' : 'unread';
     let selectedClass = this.props.checked? 'selected' : '';
    let starredState = this.props.starred? 'fa-star' : 'fa-star-o';
    return (
      <div className={`row message  ${readState}  ${selectedClass} `} >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" defaultChecked={this.props.checked} onClick={()=> this.props.toggleSelectedState(this.props.id)}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa + ${starredState}`} onClick={(event)=>  this.props.toggleStarState(this.props.id)}></i>
            </div>
          </div>
        </div>
{/* onClick={this.toggleRead}  fits below but doesnt target each message*/}
      <div className="col-xs-11" onClick={() =>{this.props.toggleRead(this.props.id)}}>
        {this.props.labels.map((label) =>
        <span key={label} className="label label-warning" > {label} </span>)}
        <a href="#" >
          {this.props.subject}
        </a>
      </div>
      </div>

    );
  }



}

// {/* onClick={this.toggleRead}  fits below but doesnt target each message*/}
{/* <div className="col-xs-11" onClick={this.toggleRead}>
  {this.props.map((message) =>
  <span key={message.id} className="label label-warning" > {message.labels} </span>)}
  <a href="#" >
    {message.subject}
  </a>
</div> */}
// </div>
const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSelectedState,
  toggleRead,
  // checked: this.props.selected,
  toggleStarState,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
