
import * as APIUtil from '../util/reviews_api_util'
import { receiveRide, receiveErrors} from './ride_actions'

export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_RIDE_REVIEWS = "RECEIVE_RIDE_REVIEWS";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";
export const REMOVE_REVIEW ="REMOVE_REVIEW";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const removeReview = review_id =>({
    type: REMOVE_REVIEW,
    review_id
})

export const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

export const receiveRideReviews = reviews=>({
    type: RECEIVE_RIDE_REVIEWS,
    reviews
})

export const receiveReviewErrors = errors=>({
    type: RECEIVE_REVIEW_ERRORS,
    errors
})

export const clearErrors = () =>({
    type: CLEAR_ERRORS
})

export const postReview = review => dispatch => APIUtil.sendReview(review)
    .then(ride=> dispatch(receiveRide(ride)))
    .catch(err => (dispatch(receiveErrors(err.response.data))))

export const fetchReviews = (rideId) => dispatch => APIUtil.fetchReviewsForRide(rideId)
    .then(reviews => dispatch(receiveRideReviews(reviews.data)))
    .catch(err => dispatch(receiveReviewErrors(err.response.data)))

export const deleteReview = (reviewId) => dispatch =>
         APIUtil.deleteReview(reviewId)
           .then(()=> dispatch(removeReview(reviewId)))
           .catch(err => dispatch(receiveReviewErrors(err.response.data)));

export const removeErrors = () => dispatch => ()=> dispatch(clearErrors())