
import { connect } from "react-redux";
import { updateRide } from "../../actions/ride_actions";
import RideShow from "./rideShow";

const mapStateToProps = state => ({
  rides: Object.values(state.rides)[0];
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RideShow);
