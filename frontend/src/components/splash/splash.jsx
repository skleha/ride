import React from "react";


class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  onEnter= () =>{
      this.props.history.push("/content");

  }

  render() {
    return (
      <div>
        <div className="SplashMainPage">
          <div className="MainSplashWords "></div>

          <div className="SplashLinkCT" onClick={this.onEnter}>
            <button className="btn draw-border">Ride On</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
