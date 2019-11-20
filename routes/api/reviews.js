const express = require("express");
const router = express.Router();
const Review = require("../../models/Review");
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
            //to check and see if the same Ride/User review exists, if so replace the old review
            if (review) { 
                Review.findByIdAndUpdate(review._id, reviewContent)
                  .then(review => {
                    res.json(review);
                  })
                  .catch(err => res.status(400).json(err));
            } else {

                const newReview = new Review({
                  userId: req.body.userId,
                  rideId: req.body.rideId,
                  rating: req.body.rating,
                  description: req.body.description  
                })
                newReview.save()
                    .then(review => res.json(review)).catch(err => res.status(400).json(err))
            }
        })
  }
);

// ,passport.authenticate("jwt", { session: false })

router.delete('/:review_id', (req, res)=> {
    Review.findByIdAndDelete(req.params.review_id)
      .then( () => {
        res.json(review_id);
      })
      .catch(err => res.status(400).json(err))
})


module.exports = router;