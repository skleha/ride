const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RideSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  author_id: {
    type: String
  },
  author_rating: {
    type: Number
  },
  duration: {
    type: String
  },
  polyline: {
    type: Object,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  waypoints: {
    type: Array,
    required: true
  },
  markers: {
    type: Array,
    required: true
  },
  start: {
    type: Array,
    required: true
  }

});

module.exports = Ride = mongoose.model("rides", RideSchema);