import React from 'react';
import RideIndexItem from './RideIndexItem';

class RideIndex extends React.Component {

  componentDidMount() {
    this.props.fetchRides();
  }

  render() {
    // debugger;
    return (
      <ul className="ride-index-ul">
        {this.props.rides.map((ride,idx) =>
         <RideIndexItem ride={ride} key={idx} 
          signedIn = {this.props.signedIn}
          activateModal = {this.props.activateModal}
          currentUserId = {this.props.currentUserId}

         />)}
      </ul>
    )
  }
}

export default RideIndex;
