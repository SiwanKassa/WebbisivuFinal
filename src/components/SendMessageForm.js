import React from 'react'
import ReactDOM from 'react-dom';


class SendMessageForm extends React.Component {

    constructor() {
        super()
        this.state = {
          joinedRooms: [],
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }


  handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }


    render() {


      if (this.props.disabled) {
        return (
            <form className="hidden">

            </form>

        )
      } else
        return (
            <form className="send-message-form"
                onSubmit={this.handleSubmit}>
                <input className="text-area" disabled={this.props.disabled} onChange={this.handleChange} value={this.state.message} placeholder="Lähetä viesti painamalla ENTER" type="text" />
                <input type="submit" className="send-button">

                </input>
            </form>
        )
    }
}

export default SendMessageForm