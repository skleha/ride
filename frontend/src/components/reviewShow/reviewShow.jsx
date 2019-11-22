import React from "react";
import ReviewShowItem from "./reviewShowItem"

class ReviewShow extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
      this.props.fetchReviews(this.props.rideId)
  }

  render() {
    return (
      <ul className="ReviewIndexBox">
        {this.props.reviews.map((review, idx) => (
          <ReviewShowItem 
          currentUserId={this.props.currentUserId}
          review={review}
          deleteReview={this.props.deleteReview}
           key={idx}
          />  
        ))}
      </ul>
    );
  }
}

export default ReviewShow;
