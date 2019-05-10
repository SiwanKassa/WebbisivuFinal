import React from 'react'
import Profile from "../views/Profile";

function Message(messages) {

    return (
        <div className="message">

            <div className="message-text">{messages.text}</div>
        </div>
    )
}

export default Message