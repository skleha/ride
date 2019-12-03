
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import rideIndex from "./RideIndex";
import { fetchRides } from "../../actions/ride_actions";
import { openModal } from "../../actions/modal_actions";
import {postReview, fetchReviews, deleteReview} from "../../actions/review_actions"


const mapStateToProps = state => ({
  rides: Object.values(state.rides),
  signedIn: state.session.isAuthenticated,
  currentUserId: state.session.user.id,
  reviews: Object.values(state.reviews),
  currentUserName:state.session.user.username
});

const mapDispatchToProps = dispatch => ({
  fetchRides: () => dispatch(fetchRides()),
  activateModal: (action, id) => dispatch(openModal(action, id)),
  postReview: (review) => dispatch(postReview(review)),
  fetchReviews: (rideId)=> dispatch(fetchReviews(rideId)),
  deleteReview: (reviewId) => dispatch(deleteReview(reviewId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(rideIndex));
