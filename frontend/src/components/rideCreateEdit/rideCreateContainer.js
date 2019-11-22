
import { connect } from "react-redux";
import { createRide } from "../../actions/ride_actions";
import RideCreateEdit from "./rideCreateEdit";

const mapStateToProps = state => ({
  newRide:  {  title: "",
              duration: "",
              author_rating: 0,
              description: "",
              waypoints: [{"lat": 37.495326, "lng": -122.368773}, {"lat": 37.258991, "lng": -122.122663 }]
            }
});

const mapDispatchToProps = dispatch => ({
  createRide: ride => dispatch(createRide(ride))
});

export default connect(mapStateToProps, mapDispatchToProps)(RideCreateEdit);
