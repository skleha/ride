import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.filterFunc = this.filterFunc.bind(this);
  }

  componentDidMount() {
    // previously called fetch rides in Ride Index, but doing it here
    // so that the state of this component has something in it.
    // if not here, the state here will be empty.

    this.props
      .fetchRides()
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

    // const normalizedRides = filteredRides.reduce((acc, ele) => {
    //   acc[ele.id] = ele;
    //   return acc;
    // }, {});

    this.props.rideSearch(filteredRides);
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
