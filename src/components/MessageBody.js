import React from 'react'

export default class MessageBody extends React.Component {

  componentDidMount() {
    this.props.openMessage(this.props.message, this.props.history)
  }

  render() {
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          { this.props.message.body }
        </div>
      </div>
    )
  }

}
