const Validator = require("validator");
const validText = require("./valid-text");
const validNumber = require("./valid-number");
const validArray = require("./valid-array");
const validObject = require("./valid-object");

module.exports = function validateRideInput(data) {

    let errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';
    data.author_id = validText(data.author_id) ? data.author_id : '';
    data.author_rating = validNumber(data.author_rating) ? data.author_rating : '';
    data.author_name = validText(data.author_name) ? data.author_name : '';
    data.duration = validText(data.duration) ? data.duration : '';
    data.start_address = validText(data.start_address) ? data.start_address : '';
    data.start_city = validText(data.start_city) ? data.start_city : '';
    data.distance = validNumber(data.distance) ? data.distance : '';
    data.polyline = validObject(data.polyline) ? data.polyline : '';
    data.destination = validText(data.destination) ? data.destination : '';
    data.waypoints = validArray(data.waypoints) ? data.waypoints : '';
    data.markers = validArray(data.markers) ? data.markers : '';
    data.start = validArray(data.start) ? data.start : '';


    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    if (Validator.isEmpty(data.author_id)) {
        errors.author_id = "Author id is required";
    }

    if (data.author_rating === "") {
        errors.author_rating = "Author rating required";
    }

    if (Validator.isEmpty(data.author_name)) {
        errors.author_rating = "Author name required";
    }

    if (Validator.isEmpty(data.duration)) {
        errors.duration = "Duration field is required";
    }

    if (Validator.isEmpty(data.start_address)) {
        errors.start_address = "Start address field is required"
    }

    if (Validator.isEmpty(data.start_city)) {
        errors.start_city = "Start city field is required"
    }

    if (data.distance === "") {
        errors.distance = "Distance is required";
    }

    if (data.polyline === "") {
        errors.polyline = "Polyline is required";
    }

    if (Validator.isEmpty(data.destination)) {
        errors.destination = "Destination is required" 
    }

    if (data.waypoints === "") {
        errors.waypoints = "Waypoints are required";
    }

    if (data.markers === "") {
        errors.markers = "Markers are required";
    }

    if (data.start === "") {
        errors.start = "Start is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

};