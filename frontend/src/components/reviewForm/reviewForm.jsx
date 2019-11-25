import React from "react";
import StarRatingComponent from 'react-star-rating-component'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.currentUserId,
      rideId: this.props.rideId,
      rating: this.props.review.rating,
      authorName: this.props.currentUserName,
      description: this.props.review.description
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onStarClick = this.onStarClick.bind
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const review = Object.assign({}, this.state);
    this.props.postReview(review);
    this.props.closeReviewPost();
    setTimeout(() => {
      this.props.fetchReviews(this.props.rideId)
    }, 100);
    ;
  }

  componentWillUnmount() {}
  componentDidMount() {}

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;
    return (
      <div className="review-form-container">
        <form onSubmit={this.handleSubmit} className="review-form-box">
           <label className="review-description-container">
                <input
                type="text"
                value={this.state.description}
                onChange={this.update("description")}
                className="review-description-textbox"
                placeholder="Review Content"
                />
           </label>
            <div className= "reviewFormLowerContainer">

                <label className="emailFieldContainer signupFC">
                    <h2>Rating from state: {rating}</h2>
                    <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={rating}
                     starColor={"#e80f0f"}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                </label>

            <input className="review-submit form-button" type="submit" value="PostReview" />
            </div>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
