import { RECEIVE_REVIEW, RECEIVE_RIDE_REVIEWS, REMOVE_REVIEW } from '../actions/review_actions';
//j
const ReviewReducer = ( state ={}, action)=>{
    Object.freeze(state);
    let newState = Object.assign({},state)

    switch(action.type){
        case RECEIVE_REVIEW:
            let id = action.review.data._id ? action.review.data._id : action.review.id
            newState[id] = action.review.data;
            return newState;
        case RECEIVE_RIDE_REVIEWS:
            action.reviews.forEach(rev=>{
                newState[rev._id]=rev
            })
            return newState;
        case REMOVE_REVIEW:
            delete newState[action.review_id];
            return newState;
        default:
            return state;
    }

}

export default ReviewReducer;