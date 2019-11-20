import React from 'react';


class RideIndexItem extends React.Component {


  render() {
    
    return (
      <li className="ride-index-item">
        <div>{this.props.ride.title}</div>
        <div>{this.props.ride.description}</div>
      </li>
    );
  }
}

export default RideIndexItem;
