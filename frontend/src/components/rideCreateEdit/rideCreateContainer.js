
import { connect } from "react-redux";
import { createRide } from "../../actions/ride_actions";
import RideCreateEdit from "./rideCreateEdit";

const mapStateToProps = state => ({
  newRide: {
    title: "",
    duration: "",
    author_rating: 0,
    author_id: "5cc45600ad11329216c4d886",
    description: "",
    start: "",
    destination: "",
    polyline: "",
    waypoints: [
      { lat: 37.495326, lng: -122.368773 },
      { lat: 37.258991, lng: -122.122663 }
    ]
  },
  user: "user data"
});

const mapDispatchToProps = dispatch => ({
  createRide: ride => dispatch(createRide(ride))
});

export default connect(mapStateToProps, mapDispatchToProps)(RideCreateEdit);

