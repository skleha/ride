import React from "react";
import './App.css'

//import css

import './css/footer.css'
import './css/navbar.css'
import './css/splash.scss'
import './css/modal.css'
import './css/sigupform.css'
import './css/login.css'

import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";

// import SignUpFormContainer from "./session_form/signup_form_container";
// import LogInFormContainer from "./session_form/login_form_container";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import SplashContainer from "./components/splash/splash_container";
// import DashboardContainer from "./dashboard/dashboard_container";
import NavbarContainer from "./components/navBar/navbar_container";
import Modal from "./components/modal/modal";
import RideIndexContainer from "./components/rideIndex/RideIndexContainer";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    

    let backgroundImage;
    let setting;

   
    
      backgroundImage = {
        backgroundImage:
          "url(https://66.media.tumblr.com/9e4176a7e3ba14fe8f5d314e1460fb17/tumblr_mhu37w9yUf1r3d8abo1_r1_500.gifv)"
      };
      setting = "withBackgroundImage";
    

    return (
      <div className="MAIN">
        <Modal />
        <header className="main-header">
          <NavbarContainer />
        </header>
        <div className={`${setting}`} style={backgroundImage}>
        
          <Switch>
            {/* <ProtectedRoute path="/dashboard" component={DashboardContainer} /> */}
            {/* <AuthRoute exact path="/login" component={LogInFormContainer} /> */}
            {/* <AuthRoute exact path="/signup" component={SignUpFormContainer} /> */}
            <Route path="/" component={SplashContainer} />
          </Switch>
        </div>

        <footer className="main-footer"></footer>
      </div>
    );
  }
}

export default App;