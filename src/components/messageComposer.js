import React, { Component } from "react";

class MessageComposer extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);

  }
  submitForm(event) {
    event.preventDefault();
    this.props.sendMessage({
      subject : event.target.subject.value,
      body : event.target.value
    })
  }
  render() {
    const message = this.props.subject ? "Compose Message" : "";


    return (
      <form className="form-horizontal well" onSubmit={ this.submitForm }>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>
              {message}
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
}

export default MessageComposer;
