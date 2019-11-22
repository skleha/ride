import React from "react";
import sampleMap from "../../sample-map.jpg";
import StarRatingComponent from "react-star-rating-component";

class RideCreateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.newRide;
    this.handleChange = this.handleChange.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ author_rating: nextValue });
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.currentTarget.value });    
  }

  handleChange(e) {
    this.setState({ duration: e.currentTarget.value });
  }

  render() {
    const { rating } = this.state;

    return (
      <div className="ride-create-edit-temp-container">
        <div className="ride-create-edit">
          <div className="ride-create-edit-data">
            <div className="ride-create-edit-title">Create a Ride</div>

            <div className="ride-edit-create-label">Ride Name</div>
            <input
              className="ride-create-edit-input"
              type="text"
              placeholder="Ride Name"
              onChange={this.handleInput("title")}
            />

            <div className="ride-edit-create-label">Duration</div>
            <select
              className="ride-edit-create-select"
              onChange={this.handleChange}
            >
              <option selected disabled>
                Duration
              </option>
              <option value="Partial Day">Partial Day</option>
              <option value="Full Day">Full Day</option>
              <option value="Multi-Day">Multi-Day</option>
            </select>

            <div className="ride-edit-create-label">Rate Your Ride</div>
            <div className="ride-edit-create-stars">
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>

            <div className="ride-edit-create-label">Describe Your Ride</div>
            <textarea
              className="ride-create-edit-textarea"
              placeholder="Describe your Ride"
              rows="7"
              cols="50"
              onChange={this.handleInput("description")}
            ></textarea>

            <div className="ride-edit-create-submit">Create Ride</div>
          </div>

          <img
            src={sampleMap}
            className="ride-create-edit-map"
            alt="map-of-ride"
          />
        </div>
      </div>
    );
  }
}

export default RideCreateEdit;
