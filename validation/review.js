const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateReviewInputData(data){
    let errors={};

    data.rating = validText(data.rating) ? data.rating: '';

    if( Validator.isEmpty(data.rating)){
        errors.rating = "Rating cannot be empty"
    }

    if(data.rating> 5 || data.rating<0){
        errors.rating = "Rating has to be between 1-5"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

}