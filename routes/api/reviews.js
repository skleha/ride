const express = require("express");
const router = express.Router();
const Review = require("../../models/Review");
const Ride = require("../../models/Ride")
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateReviewInput = require('../../validation/review')

router.get("/:ride_id", (req, res) => {
  Review.find({ rideId: req.params.ride_id })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
})
  // PRIVATE PROTECTED ROUTES
//   passport.authenticate("jwt", { session: false });
router.post("/",(req, res) => {

    const reviewContent = req.body;

    const { errors, isValid } = validateReviewInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    

    Review.findOne({userId : req.body.userId, rideId: req.body.rideId})
        .then(review => {
            if (review) { 
                Review.findByIdAndUpdate(review._id, reviewContent)

                  .then(review => {
                    Review.find({ rideId: req.body.rideId })
                      .then(reviews => {
                        const count = reviews.length;
                        let totalScore = 0;
                        reviews.forEach(review => {
                          totalScore = totalScore + review.rating
                        })
                        const averageRatings = totalScore / count
                       Ride.findByIdAndUpdate(
                          req.body.rideId, { averageRating: averageRatings },
                          { new: true }
                        )
                         .then(ride => res.json(ride))
                      })
                  })
                  .catch(err => res.status(400).json(err));
            } else {

                const newReview = new Review({
                  userId: req.body.userId,
                  rideId: req.body.rideId,
                  rating: req.body.rating,
                  authorName: req.body.authorName,
                  description: req.body.description  
                })
                newReview.save()
                  .then(review => {
                    Review.find({ rideId: req.body.rideId })
                      .then(reviews => {
                        const count = reviews.length;
                        let totalScore = 0;
                        reviews.forEach(review => {
                          totalScore = totalScore + review.rating
                        })
                        const averageRatings = totalScore / count;
                    
                        Ride.findByIdAndUpdate(
                          req.body.rideId, { averageRating: averageRatings },
                          { new: true }
                        )
                        .then(ride=>res.json(ride))
                      })
                  })
                    .catch(err => res.status(400).json(err))
            }
        })
        
  }
);

router.delete("/:review_id", (req, res) => {
  Review.deleteOne({_id: req.params.review_id})
    .then(review=> res.json({msg: "deleted"}))
    .catch(err=> res.status(404).json({msg:"Doesn't exist"}))
});

module.exports = router;