const Validator = require("validator");
const validText = require("./valid-text");


module.exports = function validateRideInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';
  data.description = validText(data.description) ? data.description : '';
  data.duration = validText(data.duration) ? data.duration : '';
  data.author_id = validText(data.author_id) ? data.author_id : '';
  data.author_rating = validText(data.author_rating) ? data.author_rating : '';
  data.waypoints = validText(data.waypoints) ? data.waypoints : '';

  if (Validator.isEmpty(data.title)) {
      errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.description)) {
      errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.duration)) {
      errors.duration = "Duration field is required";
  }

  if (Validator.isEmpty(data.author_id)) {
      errors.author_id = "Author id is required";
  }

  if (Validator.isEmpty(data.author_rating)) {
      errors.author_rating = "Author rating required";
  }
  
  if (Validator.isEmpty(data.waypoints)) {
    errors.waypoints = "Waypoints are required";
  }

  return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

};