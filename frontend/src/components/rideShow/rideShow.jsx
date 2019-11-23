
import React from 'react';
import sampleMap from '../../sample-map.jpg';
import Map from './map'
class RideShow extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const { ride } = this.props
    return (
      // <div className="ride-show-temp-container">
        <div className="ride-show">
          <Map start={ride.start} destination={ride.destination} poly={ride.polyline}/>
          <div className="ride-show-title">{this.props.ride.title}</div>
          <div className="ride-show-data-description">

            <div className="ride-show-data">
              <div className="ride-show-datum">Distance: 22.2</div>
              <div className="ride-show-datum">Duration: {ride.duration}</div>
              <div className="ride-show-datum">Author Rating: {ride.author_rating}</div>
              <div className="ride-show-datum">Overall Rating: 4.2</div>
            </div>

            <div className="ride-show-description">{this.props.ride.description}</div>
          </div>
        </div>
      // </div>
    )
  }
}

export default RideShow;