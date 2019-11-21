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

    return (
      <li className="ride-index-item" onMouseEnter={this.toggleClass} onMouseLeave={this.toggleClass}>
        
        <div className="ride-index-item-container">
          <div className="ride-index-data">
            <div className="ride-index-item-title">{this.props.ride.title}</div>
            <div className="ride-index-item-datum">San Francisco, CA</div>
            <div className="ride-index-item-datum">Distance: 22.7 mi</div>
            <div className="ride-index-item-datum">
              Duration: {this.props.ride.duration}
            </div>
          </div>
          <img src={sampleMap} className="ride-index-item-map" alt="map-of-ride"/>
        </div>

        <div className={`button-tray ${this.props.ride._id}`}>
          <div className={`ride-index-item-button ${this.props.ride._id}`}>Write Review</div>
          <div className={`ride-index-item-button ${this.props.ride._id}`}>Edit Ride</div>
        </div>

      </li>
    );
  }
}

export default RideIndexItem;
