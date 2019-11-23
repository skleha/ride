const express = require("express");
const router = express.Router();
const Ride = require("../../models/Ride");
const validateRideInput = require('../../validation/ride_validations');


router.get('/', (req, res) => {
  Ride.find({})
  .then(rides => {
      res.json(rides);
    },
    err => console.log(err));
})


router.get('/:ride_id', (req, res) => {
  Ride.findById(req.params.ride_id)
    .then(ride => {
      if (ride === null) {
        res.status(404).json({ride: 'Ride was not found'});
      } else {
        res.json(ride);
      }
  })
})


router.post('/', (req, res) => {

  const { errors, isValid } = validateRideInput(req.body);
  
    if (!isValid) {
      return res.status(404).json(errors);
  }
  
  const newRide = new Ride({
    title: req.body.title,
    description: req.body.description,
    author_id: req.body.author_id,
    author_rating: req.body.author_rating,
    duration: req.body.duration,
    polyline: req.body.polyline,
    destination: req.body.destination,
    waypoints: req.body.waypoints,
    markers: req.body.waypoints,
    start: req.body.start
  })

  newRide.save()
    .then(ride => {
      res.json(ride)
    }, err => console.log(err))
})


router.patch('/:ride_id', (req, res) => {
  const filter = { _id: req.params.ride_id };
  const update = req.body
  
  Ride.findOneAndUpdate(filter, update, { new: true })
    .then(ride => {
       if (ride === null) {
        res.status(404).json({ride: 'Ride was not found'});
      } else {
        res.json(ride);
      }
    });
})


router.patch("/:ride_id/addwaypoint", (req, res) => {  
  const filter = { _id: req.params.ride_id };
  const update = { $addToSet: { waypoints: req.body.new_waypoint } };
  
  Ride.findOneAndUpdate(filter, update, { new: true })
    .then(ride => {
      if (ride === null) {
        res.status(404).json({ ride: "Ride was not found" });
      } else {
        res.json(ride);
      }
    });
});


router.delete("/:ride_id", (req, res) => {
  Ride.findByIdAndDelete(req.params.ride_id)
    .then(ride => {
      if (ride === null) {
        res.status(400).json({ ride: "Ride was not found" });
      } else {
        res.json(ride);
      }
  });
});

module.exports = router;