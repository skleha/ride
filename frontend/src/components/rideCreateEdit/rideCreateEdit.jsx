import React from "react";
import sampleMap from "../../sample-map.jpg";
import StarRatingComponent from "react-star-rating-component";


class RideCreateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.newRide ? this.props.newRide : this.props.ride
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleChange(e) {
    this.setState({ duration: e.currentTarget.value });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ author_rating: nextValue });
  }

  handleSubmit(e) {
    let data = this.state
    this.props.formType === "Edit a Ride" ? this.props.activateModal("2ndEditPostForm", data) : this.props.activateModal("2ndPostForm", data)
  }

  render() {
    let deleteButton="";
    if (this.props.formType ===  "Edit a Ride"){
      deleteButton=(
        < div
      className = "ride-edit-create-submit die-button"
          onClick={()=>this.props.deleteRide(this.props.ride._id)
          .then(()=>this.props.closeModal())
        .then(() => this.props.fetchRides())
          
          }
        >
        Delete Ride
            </div >
      )

    }

    return (
      
        <div className="ride-create-edit-form">
          <div className="ride-create-edit-data">
            <div className="ride-create-edit-title">{this.props.formType}</div>

            <div className="ride-edit-create-label">Ride Name</div>
            <input
              className="ride-create-edit-input"
              type="text"
              placeholder="My Favorite Ride"
              value={this.state.title}
              onChange={this.handleInput("title")}
            />

            <div className="ride-edit-create-label">Full Start Address</div>
            <input
              className="ride-create-edit-input"
              type="text"
              placeholder="123 Main Street"
              onChange={this.handleInput("start_address")}
              value={this.state.start_address}
              disabled={this.props.formType === 'Edit a Ride' ? "disabled" : ""}
            />

            <div className="ride-edit-create-label">Start City</div>
            <input
              className="ride-create-edit-input"
              type="text"
              placeholder="Town, State"
              onChange={this.handleInput("start_city")}
              value={this.state.start_city}
            disabled={this.props.formType === 'Edit a Ride' ? "disabled" : ""}
            />

            <div className="ride-edit-create-label">Ride Duration</div>
            <select
              className="ride-edit-create-select"
              onChange={this.handleChange}
              value={this.state.duration}
            >
              <option>
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
                value={this.state.author_rating}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>

            <div className="ride-edit-create-label">Describe Your Ride</div>
            <textarea
              className="ride-create-edit-textarea"
              placeholder="... more curves than a race track!"
              rows="7"
              cols="50"
              onChange={this.handleInput("description")}
              value={this.state.description}
            ></textarea>
            <div className= "ride-buttons-delet">
                <div
                  className="ride-edit-create-submit"
                  onClick={this.handleSubmit}
                >
                  Go To Map
                </div>
                {deleteButton}
           </div>
          </div>
        </div>
      
    );
  }
}

export default RideCreateEdit;
