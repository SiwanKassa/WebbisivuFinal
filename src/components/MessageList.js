import React from 'react'
import ReactDOM from 'react-dom'
import Messages from './Message'
import RoomList from './RoomList'


class MessageList extends React.Component {
  constructor() {
    super()
    this.state = {
      joinedRooms: []
    }


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


    render() {

        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                      <div className={"arrows"}>
                      <div className={"arrow"}>
                          Katso Kysymykset  &#8599;
                      </div>

                        <div className={"arrow2"}>
                      Kysy Kysymys  &darr;
                      </div></div>
                    </div>
                </div>
            )
        } else
        return (
            <div className="message-list">

                {this.props.messages.map((messages, index) => {

                    return (
                        <div>

                        <Messages key={messages.id} username={messages.senderId} text={messages.text} />
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default MessageList