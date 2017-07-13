import React, { Component } from 'react';

// <div className={"row message " + this.props.read? read : unread}>   </div>



class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: this.props.subject,
      id: this.props.id,
      starred: this.props.starred,
      labels: this.props.labels,

      read: this.props.read,
      checked: this.props.selected,
    };
    this.toggleStar = this.toggleStar.bind(this);
    this.toggleSelectedState = this.toggleSelectedState.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }

  //change state of message to
  toggleRead() {
    let messageId = this.state.id;
    // let isRead = this.state.read;
    this.props.toggleRead(messageId) ;
  }

  toggleStar() {
   let messageId = this.state.id;

    console.log('things HAPPEN', this.state.starred);
   this.props.toggleStarState(messageId, 'starred');
  }

  toggleSelectedState() {
    let checkedState = this.state.checked;
    // let selected = this.state.selected;
    this.props.toggleCheckState(!checkedState);
  }

  render() {
    let readState = this.props.read? 'read' : 'unread';
    let checkedState = this.props.checked? ' selected' : ' ';
    let starredState = this.props.starred? 'fa-star' : 'fa-star-o';
    return (
      <div className={`row message  ${readState}  ${checkedState} `} >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" defaultChecked={checkedState} onClick={this.toggleSelectedState}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa + ${starredState}`} onClick={this.toggleStar}></i>
            </div>
          </div>
        </div>

      <div className="col-xs-11">
        {this.props.labels.map((label) =>
        <span key={label} className="label label-warning"> {label} </span>)}
        <a href="#">
          {this.props.message}
        </a>
      </div>
      </div>

    );
  }



}


export default Message;
