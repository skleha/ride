import React from "react";

class ReviewShow extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
      this.props.fetchReviews(this.props.rideId)
  }

  render() {
    // debugger;
    return (
      <ul className="ride-index-ul">
        {this.props.reviews.map((ride, idx) => (
         
        ))}
      </ul>
    );
  }
}

export default ReviewShow;
