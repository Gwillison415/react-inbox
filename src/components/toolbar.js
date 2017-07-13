import React, { Component } from 'react';




class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: this.props.subject,
      id: this.props.id,
      starred: this.props.starred,
      labels: this.props.labels,
      selected: this.props.selected,
      read: this.props.read,
      checked: this.props.selected,
    };

  }

  //finds messsages where messages have been checked
  isChecked = () =>  {
    return this.props.list.filter(message => message.checked);
  }


  messageListStatusFn = () => {
    let toggledMessages = this.isChecked();
    console.log(toggledMessages, " CHECKED MESSAGES");
    const unchecked = "fa fa-square-o";
    const someChecked = "fa fa-minus-square-o";
    const checked = "fa fa-check-square-o";

      if (toggledMessages.length === this.props.list.length) {
        return checked;
      } else if (toggledMessages.length > 0) {
        return someChecked;
      } else if (toggledMessages.length === 0) {
        return unchecked;
      }
    };

  unreadMessages = () => {
    let count = this.props.list.reduce((total, message) => {
      if (message.read === false) total++;
      return total;
    }, 0);
    return (
        <span className="badge badge">
          {count} unread messages
        </span>
      );
    };
    //finds all messages where messages are checked
  markRead = () => {
    let checkedMessages = this.isChecked();
    this.props.toggleRead(checkedMessages)
  }
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
            {this.unreadMessages()}
          </p>
            {/* {this.messageListStatusFn} */}
          <button className="btn btn-default">
            <i className={this.messageListStatusFn()}></i>
          </button>

          <button className="btn btn-default" onClick={this.markRead}>
            Mark As Read
          </button>

          <button className="btn btn-default">
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }

}



export default Toolbar;
