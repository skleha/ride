
import { connect } from "react-redux";
import rideIndex from "./RideIndex";
import { fetchRides } from "../../actions/ride_actions";


const mapStateToProps = state => ({
  rides: Object.values(state.rides)
})

const mapDispatchToProps = dispatch => ({
  fetchRides: () => dispatch(fetchRides())
})

export default connect(mapStateToProps, mapDispatchToProps)(rideIndex);
