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
  author_name: {
    type: String
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
  },

  averageRating: {
    type: Number,
    default: 0
  }

});

module.exports = Ride = mongoose.model("rides", RideSchema);