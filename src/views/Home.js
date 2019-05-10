import React from 'react';
import Banner from '../components/Banner';
import Rules from '../components/Rules';
import RoomList from '../components/RoomList';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import NewRoomForm from '../components/NewRoomForm';
import Chatkit from '@pusher/chatkit-client';
import {instanceLocator, tokenUrl} from '../config';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      userData: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'hei',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl,
      }),
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.getRooms();
    }).catch(err => console.log('error on connecting: ', err));
  }

  getRooms() {
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms,
      });
    }).catch(err => console.log('error on joinableRooms: ', err));
  }

  subscribeToRoom(roomId) {
    this.setState({messages: []});
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
          });
        },

      },
    }).then(room => {
      this.setState({
        roomId: room.id,
      });
      this.getRooms();
    }).catch(err => console.log('error on subscribing to room: ', err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId,
    });
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name,
    }).then(room => {
      this.subscribeToRoom(room.id);
    }).catch(err => console.log('error with createRoom: ', err));
  }

  render() {
    return (

        <React.Fragment>
          <div className="app">
            <React.Fragment>
              <Rules/>
              <Banner/>
              <RoomList
                  subscribeToRoom={this.subscribeToRoom}
                  rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                  roomId={this.state.roomId}/>
              <MessageList
                  roomId={this.state.roomId}
                  messages={this.state.messages}/>
              <SendMessageForm
                  disabled={!this.state.roomId}
                  sendMessage={this.sendMessage}/>
              <NewRoomForm createRoom={this.createRoom}/>
            </React.Fragment>
          </div>
        </React.Fragment>
    );
  };
}

export default (Home);