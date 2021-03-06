import React from "react";
import './App.css'

//import css
import './css/footer.css'
import './css/navbar.css'
import './css/splash.scss'
import './css/modal.css'
import './css/sigupform.scss'
import './css/login.scss'
import "./css/rideIndex.css"
import './css/rideIndexItem.css'
import './css/contentPage.css'
import './css/rideCreateEdit.css'
import './css/rideShow.css'
import './css/review.css'
import './css/rideCreateComp.css'

import { Route, Switch} from "react-router-dom";
import { AuthRoute } from "./util/route_util";
import SplashContainer from "./components/splash/splash_container";
import NavbarContainer from "./components/navBar/navbar_container";
import Modal from "./components/modal/modal";
import contentPageContainer from "./components/contentPage/contentPage_container";
import rideCreateContainer from "./components/rideCreateEdit/rideCreateContainer";
import aboutUsPage from "./components/aboutus/aboutus"

class App extends React.Component {
  
  render() {
    let varbackgroundImage;
    let setting;
    
      varbackgroundImage = {
        backgroundImage:
          "url(https://66.media.tumblr.com/9e4176a7e3ba14fe8f5d314e1460fb17/tumblr_mhu37w9yUf1r3d8abo1_r1_500.gifv)"
      };
      setting = "withBackgroundImage";
      if (
        this.props.history.location.pathname === "/content" ||
        this.props.history.location.pathname === "/create"||
        this.props.history.location.pathname === "/aboutus"
      ) {
        setting = "noBackgroundImage";
        varbackgroundImage = null;
      }
    
    
    return (
      <div className={`MAIN ${setting}`}>
        <Modal />
        <header className="main-header">
          <NavbarContainer />
        </header>
        <div className={`${setting}`} style={varbackgroundImage}>
          <Switch>
            <AuthRoute exact path="/" component={SplashContainer} />
            <Route path="/content" component={contentPageContainer} />
            <Route path="/create" component={rideCreateContainer} />
            <Route path="/aboutus" component={aboutUsPage}/>
          </Switch>
        </div>

        <footer className="main-footer"></footer>
      </div>
    );
  }
}



export default App;