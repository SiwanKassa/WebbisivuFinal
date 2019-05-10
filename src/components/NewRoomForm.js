import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import plus from  "../plus.png"

class NewRoomForm extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            roomName: '',
            show: false
        }


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({roomName: ''})
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });

    }

    render () {
        return (
            <>
            <div className="new-room-form">
                <Button variant="link"  onClick={this.handleShow}>
                   <img className="plus" src={plus}/>
                </Button>
            </div>
                <Modal className="tyhja" show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title> Kysy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row">
                        <form onSubmit={this.handleSubmit} className="new-question">
                            <input
                                value={this.state.roomName}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Kysy kysymys"
                                required />
                            <button id="create-room-btn" type="submit">+</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default NewRoomForm