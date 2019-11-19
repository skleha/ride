const express = require("express");
const router = express.Router();
const Ride = require("../../models/Ride");
const validateRideInput = require('../../validation/ride');


router.get('/', (req, res) => {
  Ride.find({}).then(
    rides => {
      res.json(rides);
    },
    err => console.log(err));
})


router.get('/:ride_id', (req, res) => {
  Ride.findById(req.params.ride_id)
    .then(ride => {
      if (ride === null) {
        res.json({ride: 'Ride was not found'});
      } else {
        res.json(ride);
      }
  })
})


router.post('/', (req, res) => {
  
  const { errors, isValid } = validateRideInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
  }
  
  const newRide = new Ride({
    title: req.body.title,
    author_id: parseInt(req.body.author_id),
    author_rating: parseInt(req.body.author_rating),
    waypoints: JSON.parse(req.body.waypoints),
    description: req.body.description,
    duration: req.body.duration,
  })

  newRide.save()
    .then(ride => {
      res.json(ride)
    }, err => console.log(err))
})


router.patch('/:ride_id', (req, res) => {
  const filter = { _id: req.params.ride_id };
  const update = {}
  
  for (key in req.body) {
    if (key === "waypoints") {
      update[key] = JSON.parse(req.body[key]);
    } else if (key === "author_id" || key === "author_rating") {
      update[key] = parseInt(req.body[key]);
    } else {
      update[key] = req.body[key];
    }
  }
  
  Ride.findOneAndUpdate(filter, update, { new: true })
    .then(
      ride => {
        res.json(ride);
      },
      err => console.log(err)
  );
})


router.patch("/:ride_id/addwaypoint", (req, res) => {  
  const filter = { _id: req.params.ride_id };
  const waypoint = JSON.parse(req.body.new_waypoint);
  const update = { $addToSet: { waypoints: waypoint } };
  
  Ride.findOneAndUpdate(filter, update, { new: true }).then(
    ride => {
      res.json(ride);
    },
    err => console.log(err)
  );
});


router.delete("/:ride_id", (req, res) => {
  Ride.findOneAndRemove(req.params.ride_id).then(
    ride => {
      if (ride === null) {
        res.json({ride: 'Ride was not found'});
      } else {
        res.json(ride);
      };
  });
});


module.exports = router;