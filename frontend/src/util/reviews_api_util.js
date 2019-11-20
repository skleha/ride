import axios from "axios";


export const sendReview = req =>{
    return axios.post(`/api/reviews/`, req);
}

export const fetchReviewsForRide = rideId =>{
    return axios.get(`/api/reviews/${rideId}`)
}

export const deleteReview = reviewId => {
    return axios.delete(`/api/reviews/${reviewId}`)
}