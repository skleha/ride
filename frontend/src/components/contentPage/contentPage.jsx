import React from "react";
import RideIndexContainer from "../rideIndex/RideIndexContainer";


class contentPage extends React.Component {
  constructor(props) {
    super(props);
  }

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
