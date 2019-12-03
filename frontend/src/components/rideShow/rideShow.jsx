import React from 'react';
import Map from './map'

class RideShow extends React.Component {

  render() {
    const { ride } = this.props
    let dist = ride.distance ? `${ride.distance} miles` : "none given"
    return (
      // <div className="ride-show-temp-container">
        <div className="ride-show">
          <Map start={ride.start} destination={ride.destination} poly={ride.polyline}/>
          <div className="ride-show-title">{this.props.ride.title}</div>
          <div className="ride-show-data-description">

            <div className="ride-show-data">
              <div className="ride-show-datum">Distance: {dist}</div>
              <div className="ride-show-datum">Duration: {ride.duration}</div>
              <div className="ride-show-datum">Author Rating: {ride.author_rating}</div>
            <div className="ride-show-datum">Average User Rating: {this.props.userRatings}</div>
            </div>

            <div className="ride-show-description">{this.props.ride.description}</div>
          </div>
        </div>
      // </div>
    )
  }
}

export default RideShow;