import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onRedirect=this.onRedirect.bind(this)
    this.aboutUs= this.aboutUs.bind(this)
  }
  onRedirect = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  aboutUs= () => {
    this.props.history.push("/aboutus")
  }

  render() {
    let bottomBorder = "";
    let animation = "bouncy";

    let button1 = (
      <h4 className="Clickable" onClick={() => this.props.activateModal("signupUser", null)}>
        SIGN UP
      </h4>
    );

    let button2 = (
      <h4 className="Clickable" onClick={() => this.props.activateModal("loginUser", null)}>
        LOG IN
      </h4>
    );
    let button3 = (<h4 className="Clickable" onClick={this.aboutUs}>US</h4>);
    let button4 = "";

    switch (this.props.signedIn) {
      case true:
        button1 = <h4 onClick={this.onRedirect}>Log Out</h4>;
        button2 = <h4 onClick={this.aboutUs}>About Us</h4>;
        button3 = (
              <h4 onClick={() => this.props.activateModal("rideCreate", null)} >
                Post
              </h4>
            );
        animation = "";
        break;
    }

    return (
      <div className={`NavBarMain ${bottomBorder ? "MainNavDashboard" : ""}`}>
        <div className="LeftNav">
          <div className="MainIcon">
            <Link className={`logo ${animation ? "bouncy" : ""}`} to="/">
              RIDE
            </Link>
          </div>

          {/* <div className="SearchBar">
                        <input className="SearchBarText" type= "text" placeholder="Not Functioning Search"></input>
                    </div> */}
        </div>
        <div className="RightNav">
          <div className={`PostButtonContainer ${animation ? "bouncy" : ""}`}>
            {button1}
          </div>
          <div className={`MenuButtonContainer ${animation ? "bouncy" : ""}`}>
            {button2}
          </div>
          <div className={`MenuButtonContainer ${animation ? "bouncy" : ""}`}>{button3}
          </div>
          <div className="HomeButtonCotainer">{button4}</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
