import React from "react";
import { Link, Redirect } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onRedirect=this.onRedirect.bind(this)
  }
  onRedirect = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    // const location = this.props.location.pathname;
    let pathWay = "";
    let buttonDisplay = "";
    let bottomBorder = "";
    let animation = "bouncy";

    let button1 = (
      <h4 onClick={() => this.props.activateModal("signupUser", null)}>
        SIGN UP
      </h4>
    );

    let button2 = (
      <h4 onClick={() => this.props.activateModal("loginUser", null)}>
        LOG IN
      </h4>
    );
    let button3 = ""
    let button4 = "";

    switch (this.props.signedIn) {
      case true:
        button1 = <h4 onClick={this.onRedirect}>Log Out</h4>;
        button2 = <h4>Setting</h4>;
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
          <div className="LightingButtonContainer">{button3}</div>
          <div className="HomeButtonCotainer">{button4}</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
