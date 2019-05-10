import React from "react";
import fuksifoormi from  "../fuksifoorumi.png"

class Banner extends React.Component {
    reloadPage () {
        window.location.reload("/")
    }
  render() {

    return (


          <div className="banner" >
            <img className="logo" src={fuksifoormi} onClick={() => this.reloadPage()}/>

          </div>
    )}
}
export default Banner;

