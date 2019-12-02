
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import { rideSearch } from "../actions/ride_actions";
import { fetchRides } from "../actions/ride_actions";

const mapStateToProps = state => ({
  rides: Object.values(state.entities.rides)
});

const mapDispatchtoProps = dispatch => ({
  rideSearch: searchResult => dispatch(rideSearch(searchResult)),
  fetchRides: () => dispatch(fetchRides())
});

export default connect(mapStateToProps, mapDispatchtoProps)(SearchBar);
