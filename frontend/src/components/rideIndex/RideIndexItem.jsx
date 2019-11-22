import React from 'react';
import sampleMap from '../../sample-map.jpg';
import RideShow from "../rideShow/rideShow"
import ReviewShow from "../reviewShow/reviewShow"
import ReviewForm from "../reviewForm/reviewForm"

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
    this.detailsReset= this.detailsReset.bind(this);
    this.giveFullDetail = this.giveFullDetail.bind(this);
    this.openRideShow = this.openRideShow.bind(this);
    this.closeRideShow = this.closeRideShow.bind(this);
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
  
  openRideShow(e) {
    this.giveFullDetail();
    this.toggleClass();
  }

  closeRideShow(e) {
    this.detailsReset();
    this.toggleClass();
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
  let button1container;
  let button2container;


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



  // show reviews
  let showReviews = "";

  if (this.state.reviewsShow === true){
      showReviews = (<ReviewShow 
        rideId={this.props.ride._id}  
        fetchReviews={this.props.fetchReviews}
        deleteReview={this.props.deleteReview}
        reviews={this.props.reviews}
        currentUserId={this.props.currentUserId}

        />)
      button1container=null
      
  } else{
     showReviews = "";
     button1container=button1
  }


  // create review
  let createReview = "";

  if (this.state.reviewPost === false) {
      createReview = "";
      button2container=button2
  } else {
      createReview = (
        <ReviewForm
          currentUserId={this.props.currentUserId}
          postReview={this.props.postReview}
          rideId={this.props.ride._id}
          currentUserName={this.props.currentUserName}
        />
      );
      button2container=null
  }
  


    return (
      <li
        className="ride-index-item"
        onMouseEnter={this.openRideShow}
        onMouseLeave={this.closeRideShow}
      >
        
          {rideInfoBar}
          {showReviews}
          {createReview}
        
      
        <div className={`button-tray ${this.props.ride._id}`}>
          {button1container}
          {button2container}
        </div>
      </li>
    );
  }
}

export default RideIndexItem;
