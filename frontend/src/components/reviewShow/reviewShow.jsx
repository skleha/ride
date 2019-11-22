import React from "react";

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
        <li>
            <div>
                
            </div>
        </li>  
        ))}
      </ul>
    );
  }
}

export default ReviewShow;
