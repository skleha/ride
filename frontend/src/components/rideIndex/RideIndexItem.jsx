import React from 'react';
import sampleMap from '../../sample-map.jpg';
import RideShow from "../rideShow/rideShow"

class RideIndexItem extends React.Component {

  constructor(props)  {
    super(props);
    this.state = {
      buttonShow: false,
      reviewPost: false,
      reviewsShow: false,
      fullDetail: false

    }

    this.toggleClass = this.toggleClass.bind(this);   
    this.hanldeClick = this.handleClick.bind(this); 
    this.detailsReset= this.detailsReset.bind(this)
    this.giveFullDetail = this.giveFullDetail.bind(this)
  }

  toggleClass(e) {
    const buttonTray = document.getElementsByClassName(`button-tray ${this.props.ride._id}`)[0];
    buttonTray.classList.toggle("is-tray-open");

    const buttonCollection = document.getElementsByClassName(
      `ride-index-item-button ${this.props.ride._id}`
    );
    const buttons = Array.from(buttonCollection);
    buttons.forEach(button => button.classList.toggle("is-tray-open"));
  }

  detailsReset(){
    this.setState({
      buttonShow: false,
      reviewPost: false,
      reviewsShow: false,
      fullDetail: false
    });
  }

  handleClick(target){
    
    switch (target) {
      case "postReview":
        this.setState({reviewPost:true})
        break;
      case "showReviews":
        this.setState({reviewsShow:true})
        break;
      default:
        break;
    }
  }
  
  giveFullDetail(){
    this.setState({fullDetail: true})
  }

  render() {
  //button options 
  let button1 = (
    <div className={`ride-index-item-button ${this.props.ride._id}`}
      onClick={() => this.handleClick("showReviews")}
    >
      Show Reviews
    </div>
  );

  let button2 = (
    <div className={`ride-index-item-button ${this.props.ride._id}`}
      onClick = {()=>this.handleClick("postReview")}
    >  
      Post Review
    </div>
  );

  if (this.props.signedIn=== false){
    button2 = (
      <div
        className={`ride-index-item-button ${this.props.ride._id}`}
        onClick={() => this.props.activateModal('loginUser', null)}
      >
        Login First!
      </div>
    );
  }

  if (this.props.currentUserId=== this.props.ride.author_id){
    button2 = (
      <div
        className={`ride-index-item-button ${this.props.ride._id}`}
        onClick={() => {}}
      >
        Edit Ride
      </div>
    );
  }
  let showReviews="";
  let createReview="";
  
  if(this.state.reviewPost=== true){

    createReview = <h1>WORKING</h1>; 
  } else { createReview= ""}
  


  let basicBar = (
          <div className="ride-index-item-container">
            <div className="ride-index-data">
              <div className="ride-index-item-title">{this.props.ride.title}</div>
              <div className="ride-index-item-datum">San Francisco, CA</div>
              <div className="ride-index-item-datum">Distance: 22.7 mi</div>
              <div className="ride-index-item-datum">
                Duration: {this.props.ride.duration}
              </div>
            </div>
            <img src={sampleMap} className="ride-index-item-map" alt="map-of-ride" />
          </div>
  );

  let rideInfoBar =""
  
  if(this.state.fullDetail===false){
      rideInfoBar= basicBar
  } else{
      rideInfoBar = <RideShow ride={this.props.ride} />;
  }

    return (
      <li
        className="ride-index-item"
        onMouseEnter={this.toggleClass}
        onMouseEnter={this.giveFullDetail}
        onMouseLeave={this.toggleClass}
        onMouseLeave={this.detailsReset}
      >
        <div>
          {rideInfoBar}
          {showReviews}
          {createReview}
        </div>
        <div className={`button-tray ${this.props.ride._id}`}>
          {button1}
          {button2}
        </div>
      </li>
    );
  }
}

export default RideIndexItem;
