import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};


class RoomList extends React.Component {

  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


  render() {

    const { classes } = this.props


    const orderedRooms = [...this.props.rooms].sort((a, b) => b.id > a.id)
    const sideList = (
        <div className="rooms-list">
          <List>
            <div >
              <ul>
                <h3>Kysymykset</h3>
                {orderedRooms.map(room => {
                  const active = room.id === this.props.roomId ? 'active' : '';
                  return (
                      <li key={room.id} className={"room " + active + "jako"} onClick={() => this.props.subscribeToRoom(room.id)}>

                        <a
                            onClick={() => this.props.subscribeToRoom(room.id)}
                            href="#">
                          {room.name}
                        </a>
                      </li>
                  )
                })}
              </ul>
            </div>
          </List>
        </div>
    );


    return (
        <div className={"sideBar-left"} >
          <div   className={"questions"}>
          <Button type={'button'} className={"tausta, bt, btn-primary, muiSaatana"} onClick={this.toggleDrawer('right', true)}>Kysymykset</Button>
          </div>
            <SwipeableDrawer
                anchor="right"
                open={this.state.right}
                onClose={this.toggleDrawer('right', false)}
                onOpen={this.toggleDrawer('right', true)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('right', false)}
                    onKeyDown={this.toggleDrawer('right', false)}
                >
                    {sideList}
                </div>
            </SwipeableDrawer>



        </div>
    );
  }
}



RoomList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default RoomList