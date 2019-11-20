import { connect } from "react-redux";
import {
    postReview, removeErrors
} from "../../actions/review_actions";
import reviewForm from "./reviewForm";


const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.review
    };
};


const mapDispatchToProps = dispatch => {
    return {
        postReview: (review) => dispatch(postReview(review)),
        clearErrors : () => dispatch(removeErrors())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(reviewForm);