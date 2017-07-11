import React, { Component } from 'react';

// <div className={"row message " + this.props.read? read : unread}>   </div>



class Message extends Component {
  constructor(props) {
    super(props);
    // this.state = ;
  }

  render() {
    return (
      <div className={`row message   ${this.props.read? 'read' : 'unread'}  ${this.props.checked? ' selected' : ' '} `}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox"  />
            </div>
            <div className="col-xs-2">
              <i className={`star fa + ${this.props.starred? 'fa-star' : 'fa-star-o'}`}></i>
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
