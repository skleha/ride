import React from "react";
import RideIndexContainer from "../rideIndex/RideIndexContainer";


class contentPage extends React.Component {

  componentDidMount() {
        this.props.closeModal()
  }

  render() {
    return (
      <div className="ContentMain">
        <RideIndexContainer />
      </div>
    );
  }
}

export default contentPage;
