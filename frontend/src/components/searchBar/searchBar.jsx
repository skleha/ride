import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initialRides: [] };
    this.filterFunc = this.filterFunc.bind(this);
  }

  componentDidMount() {
    this.props.fetchRides()
      .then(() => this.setState({ initialRides: this.props.rides }));
  }

  filterFunc(e) {
    let filteredRides;

    if (e.currentTarget.value === "") {
      filteredRides = this.state.initialRides.slice();
    } else {
      filteredRides = this.state.initialRides.slice();
      filteredRides = filteredRides.filter(ride => {
        return (
          ride.title
            .toLowerCase()
            .search(e.currentTarget.value.toLowerCase()) !== -1
        );
      });
    }
    
    const normalizedRides = { data: filteredRides }
    this.props.rideSearch(normalizedRides);
  }

  render() {
    return (
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          onChange={this.filterFunc}
        />
    );
  }
}

export default SearchBar;
