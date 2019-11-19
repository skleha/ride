import React from "react";
import './App.css'
import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";

// import SignUpFormContainer from "./session_form/signup_form_container";
// import LogInFormContainer from "./session_form/login_form_container";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import SplashContainer from "./components/splash/splash_container";
// import DashboardContainer from "./dashboard/dashboard_container";
import NavbarContainer from "./components/navBar/navbar_container";
// import Modal from "./modal/modal";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    

    let backgroundImage;
    let setting;

   
    
      backgroundImage = { backgroundImage: "url(/giphy.gif)" };
      setting = "withBackgroundImage";
    

    return (
      <div className="MAIN">
        {/* <Modal /> */}
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