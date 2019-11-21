import React from "react";
import sampleMap from "../../sample-map.jpg";

class RideCreateEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className="ride-create-edit-temp-container">

        <div className="ride-create-edit">

          <div className="ride-create-edit-data">

            <div className="ride-create-edit-title">Create a Ride</div>

            <label>
              Title of Ride<br></br>
              <input
                className="ride-create-edit-input"
                type="text"
                placeholder="enter title"
              />
            </label>

            <label>
              Duration<br></br>
              <select>
                <option value="Partial Day">Partial Day</option>
                <option value="Full Day">Full Day</option>
                <option value="Multi-Day">Opel</option>
              </select>
            </label>

            <label className="ride-edit-create-label">
              Rate Your Ride<br></br>
              <select>
                <option selected disabled>
                  Ride Rating
                </option>
                <option value="1">1 - An Amusment</option>
                <option value="2">2 - Worth Checking Out</option>
                <option value="3">3 - Solid Ride</option>
                <option value="4">4 - Outstanding</option>
                <option value="5">5 - Epic</option>
              </select>
            </label>

            <textarea
              className="ride-create-edit-textarea"
              placeholder="Describe your Ride"
              rows="8"
              cols="50"
            ></textarea>

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
