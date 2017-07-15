import React, { Component } from 'react';

// <div className={"row message " + this.props.read? read : unread}>   </div>



class Message extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   subject: this.props.subject,
    //   id: this.props.id,
    //   starred: this.props.starred,
    //   labels: this.props.labels,
    //
    //   read: this.props.read,
    //   checked: this.props.selected,
    // };
    this.toggleStar = this.toggleStar.bind(this);
    this.toggleSelectedState = this.toggleSelectedState.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }

  //change state of message to
  toggleRead() {
    let messageId = this.props.id;

    this.props.toggleRead(messageId);

  }

  toggleStar() {
   let messageId = this.props.id;

   this.props.toggleStarState(messageId);
  }

  toggleSelectedState() {
    let messageId = this.props.id;

    this.props.toggleCheckState(messageId);
  }

  render() {
    let readState = this.props.read? 'read' : 'unread';
     let selectedClass = this.props.checked? 'selected' : '';
    let starredState = this.props.starred? 'fa-star' : 'fa-star-o';
    return (
      <div className={`row message  ${readState}  ${selectedClass} `} >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" defaultChecked={this.props.checked} onClick={this.toggleSelectedState}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa + ${starredState}`} onClick={this.toggleStar}></i>
            </div>
          </div>
        </div>
{/* onClick={this.toggleRead}  fits below but doesnt target each message*/}
      <div className="col-xs-11" onClick={this.toggleRead}>
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
export default Message;
