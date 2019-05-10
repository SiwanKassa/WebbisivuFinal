
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Modals extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button className="tausta" variant="primary" onClick={this.handleShow}>
                    LUO KÄYTTÄJÄ / KIRJAUDU
                </Button>

                <Modal className="tyhja" show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title> LUO KÄYTTÄJÄ / KIRJAUDU</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row">
                        <form className="col-md-6">
                            <h1> Luo</h1>
                        <input placeholder="Käyttäjänimi" type="text"  /> <br></br>
                        <input placeholder="Salasana" type="text" />  <br></br>
                        <input placeholder="Email" type="text" />  <br></br>
                            <Button variant="primary" onClick={this.handleClose}>
                                LUO
                            </Button>
                    </form>
                        <form className="col-md-6">
                            <h1> Kirjaudu</h1>
                            <input placeholder="Käyttäjänimi" type="text"  /> <br></br>
                            <input placeholder="Salasana" type="text" />  <br></br>
                            <Button variant="primary" onClick={this.handleClose}>
                                Kirjaudu
                            </Button>
                        </form>

                    </Modal.Body>

                </Modal>
            </>
        );
    }
}
export default Modals

