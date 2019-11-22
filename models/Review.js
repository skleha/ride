const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

  userId: {
      // type:String
    type: Schema.Types.ObjectId,
    ref: "users"
    ,required: true
  },

  rideId: {
      // type:String
    type: Schema.Types.ObjectId,
    ref: "rides"
    ,required: true
  },

  authorName:{
    type: String
  },

  rating: {
    type: Number,
    required: true
  },

  description: {
    type: String
  },

  date:{
    type: Date,
    default: Date.now
  }

});


module.exports = Review = mongoose.model('reviews', ReviewSchema)