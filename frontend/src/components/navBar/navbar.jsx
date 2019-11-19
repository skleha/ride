import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    // const location = this.props.location.pathname;

    let pathWay = "";
    let buttonDisplay = "";
    let bottomBorder = "";
    let logoutBotton = null;

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
    let button3 = "";
    let button4 = "";

    // switch (this.props.currentUser) {
    //   case null:
    //     button1 = <h4>SIGN UP</h4>;
    //     button2 = <h4>LOG IN</h4>;
    //     break;

    //   default:
    //     button1 = <h4>Log Out</h4>;
    //     button2 = <h4>Setting</h4>;
    //     break;
    // }
    
    return (
      <div className={`NavBarMain ${bottomBorder ? "MainNavDashboard" : ""}`}>
        <div className="LeftNav">
          <div className="MainIcon">
            <Link className="logo bouncy" to="/">
              RIDE
            </Link>
          </div>
          {/* <div className="SearchBar">
                        <input className="SearchBarText" type= "text" placeholder="Not Functioning Search"></input>
                    </div> */}
        </div>
        <div className="RightNav">
          <div className="PostButtonContainer bouncy">{button1}</div>
          <div className="MenuButtonContainer bouncy">{button2}</div>
          <div className="LightingButtonContainer">{button3}</div>
          <div className="HomeButtonCotainer">{button4}</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
