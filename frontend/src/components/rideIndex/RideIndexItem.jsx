import React from 'react';
import sampleMap from '../../sample-map.jpg';

class RideIndexItem extends React.Component {

  constructor(props)  {
    super(props);
    this.state = {
      buttonShow: false
    }

    this.toggleClass = this.toggleClass.bind(this);    
  }

  toggleClass(e) {
    const buttonTray = document.getElementsByClassName(`button-tray ${this.props.ride._id}`)[0];
    buttonTray.classList.toggle("is-tray-open");

    const buttonCollection = document.getElementsByClassName(
      `ride-index-item-button ${this.props.ride._id}`
    );
    const buttons = Array.from(buttonCollection);
    buttons.forEach(button => button.classList.toggle("is-tray-open"));
  }

  render() {
  //button options 
  let button1Name = 'Show Reviews'

  let button2 = (
    <div className={`ride-index-item-button ${this.props.ride._id}`}
      onClick = {()=>{}}
    >  
      Post Review
    </div>
  );

  if (this.props.signedIn=== false){
    button2 = (
      <div
        className={`ride-index-item-button ${this.props.ride._id}`}
        onClick={() => this.props.activateModal('loginUser', null)}
      >
        Login First!
      </div>
    );
  }

  if (this.props.currentUserId=== this.props.ride.author_id){
    button2 = (
      <div
        className={`ride-index-item-button ${this.props.ride._id}`}
        onClick={() => {}}
      >
        Edit Ride
      </div>
    );
  }
    
  let basicBar = (
    <div className="ride-index-item-container">
      <div className="ride-index-data">
        <div className="ride-index-item-title">{this.props.ride.title}</div>
        <div className="ride-index-item-datum">San Francisco, CA</div>
        <div className="ride-index-item-datum">Distance: 22.7 mi</div>
        <div className="ride-index-item-datum">
          Duration: {this.props.ride.duration}
        </div>
      </div>
      <img src={sampleMap} className="ride-index-item-map" alt="map-of-ride" />
    </div>
  );

    return (
      <li
        className="ride-index-item"
        onMouseEnter={this.toggleClass}
        onMouseLeave={this.toggleClass}
      >
       {basicBar}

        <div className={`button-tray ${this.props.ride._id}`}>
          <div className={`ride-index-item-button ${this.props.ride._id}`}>
            {button1Name}
          </div>
            {button2}
        </div>
      </li>
    );
  }
}

export default RideIndexItem;
