import React from 'react';
import RideIndexItem from './RideIndexItem';

class RideIndex extends React.Component {

  componentDidMount() {
    this.props.fetchRides();
  }

  render() {

    return (
      <ul className="ride-index-ul">
        {this.props.rides.map(ride => <RideIndexItem ride={ride}/>)}
      </ul>
    )
  }
}

export default RideIndex;
