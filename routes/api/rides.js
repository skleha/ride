const express = require("express");
const router = express.Router();
const Ride = require("../../models/Ride");


router.get('/', (req, res) => {
  debugger;
  res.json({message_received: "Get all rides"});
})


router.post('/', (req, res) => {

  const newRide = new Ride({
    title: req.body.title,
    author_id: parseInt(req.body.author_id),
    author_rating: parseInt(req.body.author_rating),
    waypoints: JSON.parse(req.body.waypoints),
    description: req.body.description,
    duration: req.body.duration,
    user_ratings: JSON.parse(req.body.user_ratings)
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
    if (key === "waypoints" || key === "user_ratings") {
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

router.patch('/:ride_id/addrating', (req, res) => {
  const filter = { _id: req.params.ride_id };
  const rating = parseInt(req.body.new_rating);
  const update = { $addToSet: { user_ratings: rating } };
  

  Ride.findOneAndUpdate(filter, update, { new: true }).then(
    ride => {
      res.json(ride);
    },
    err => console.log(err)
  );
})

router.patch("/:ride_id/addwaypoint", (req, res) => {
  const filter = { _id: req.params.ride_id };
  const rating = parseInt(req.body.new_rating);
  const update = { $addToSet: { user_ratings: rating } };

  Ride.findOneAndUpdate(filter, update, { new: true }).then(
    ride => {
      res.json(ride);
    },
    err => console.log(err)
  );
});



module.exports = router;