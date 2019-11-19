const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RideSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  waypoints: {
    type: Array,
    required: true,
  },
  author_id: {
    type: Number
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  author_rating: {
    type: Number
  },
  user_ratings: {
    type: Array
  }
});

module.exports = Ride = mongoose.model("rides", RideSchema);