import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Rules extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {visible: false};
    this.state = {
      roomName: '',
      show: false,
    };

  }

  handleClick() {
    this.setState(prev => ({visible: !prev.visible}));
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  render() {
    return (
        <>
          <Button className="tausta" variant="primary" onClick={this.handleShow}>
            Ohjeet
          </Button>

          <Modal className="tyhja" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h1> Ohjeet tarkoittavat sivustolla kiellettyä sisältöä. <br></br></h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="row">

              <br></br> <br></br>
              <h2> Laiton materiaali</h2>
              <br></br>
              Tähän sisältyy eläinporno, tosielämässä tapahtuva väkivalta, eläinrääkkäys, laiton kaupankäynti ja muu
              laiton materiaali.
              <br></br><br></br>
              <h2>Asiattomuudet tai muiden keskustelijoiden haukkuminen</h2>
              <br></br>
              Tämä sisältää myös runsaan kiroilun sekä yleisen rasismin.
              <br></br><br></br>
              <h2>Roskapostaus, spämmi ja huomionkeruu</h2>
              <br></br>
              Roskapostitus tarkoittaa toistuvaa esimerkiksi sisällöttömien, samansisältöisten tai aiheeseen liittymättömien viestien tai kysymysten lähettämistä.
              <br></br> <br></br>
              <h2>Mainostaminen</h2>
              <br></br>
              Et saa mainostaa Fuksifoorumin keskusteluissa ilman ylläpidon kirjallista suostumusta. Tämä sisältää myös
              referrer-linkit, joiden klikkaamisesta hyötyy joku muu henkilö, kuin klikkaaja.
              <br></br><br></br>
              <h2>Haitalliset tiedostot tai linkit</h2>
              <br></br>
              Kaikkien haitallisten tiedostojen ja linkkien lähettäminen on kielletty. Tähän sisältyy esimerkiksi
              haittaohjelmat, virukset, selauslaitteelle haittaa aiheuttavat tiedostot tai -sivustot tai linkittäminen
              näihin. Tähän sisältyy myös linkinlyhentimet.
              Alastomuus tai pornografia
              Alastomuudeksi lasketaan esimerkiksi intiimialueiden näkyminen ja lähikuvat niukasti peitetyistä
              intiimialueista.
              <br></br> <br></br>
              <h2> Muuta</h2>
              <br></br>
              Moderaattorin esittäminen sivustolla on ehdottomasti kiellettyä.
              <br></br>
              Lähettämällä tiedoston Fuksifoorumille, luovutat sen vapaaseen ei-kaupalliseen jakeluun. Kaupallisen
              käytön tekijänoikeudet säilyvät yhä sinulla.
              <br></br>
              Sääntöjä voidaan ilman erillistä ilmoitusta lisätä, poistaa tai muuttaa.
              <br></br>
              Ilmoitamme kaikista ilmoitusvelvollisuuden alaisista lakirikkeistä viranomaisille.
              <br></br> <br></br>
              <h4>Hyväksyt nämä ehdot käyttämällä tätä sivustoa.</h4>

            </Modal.Body>

          </Modal>
        </>
    );
  }
}

export default Rules;