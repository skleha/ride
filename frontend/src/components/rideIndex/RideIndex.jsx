import React from 'react';
import RideIndexItem from './RideIndexItem';
import SearchBarContainer from '../searchBar/searchBarContainer'

class RideIndex extends React.Component {

  componentDidMount() {
    this.props.fetchRides();
  }

  render() {

    return (
      <div>
        <SearchBarContainer />
        <ul className="ride-index-ul">
          {this.props.rides.reverse().map((ride, idx) => (
            <RideIndexItem
              ride={ride}
              key={idx}
              signedIn={this.props.signedIn}
              activateModal={this.props.activateModal}
              currentUserId={this.props.currentUserId}
              postReview={this.props.postReview}
              fetchReviews={this.props.fetchReviews}
              deleteReview={this.props.deleteReview}
              currentUserName={this.props.currentUserName}
              reviews={this.props.reviews}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default RideIndex;
