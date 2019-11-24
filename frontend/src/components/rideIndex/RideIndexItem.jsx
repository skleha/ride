import React from 'react';
import RideShow from "../rideShow/rideShow"
import ReviewShow from "../reviewShow/reviewShow"
import ReviewForm from "../reviewForm/reviewForm"
import RideShowContainer from '../rideShow/rideShowContainer';
var polyline = require("@mapbox/polyline");

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
    this.closeReviewPost=this.closeReviewPost.bind(this);
  }

  componentDidMount() {
    let destination = this.props.ride.destination.split("%2C%20").map(el => Number(el));
    let geojson = {
      "type": "Feature",
      "geometry": this.props.ride.polyline,
      "properties": {}
    }
    let encoded = polyline.fromGeoJSON(geojson);

    fetch(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+000(${this.props.ride.start[0]},${this.props.ride.start[1]}),pin-s-b+F00(${destination[0]},${destination[1]})/auto/300x300?access_token=pk.eyJ1IjoicHJvc2UwMDIxIiwiYSI6ImNrMzZoYWdidTAxcm8zaW82MW5jZmV6c2EifQ.PRbSpg500wqcoctnYFTIog`)
      .then( res => {
        this.setState({ sampleMap: res.url })
      })
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
    if(!this.state.fullDetail){
    this.toggleClass();
    }
  }

  closeRideShow(e) {
    e.stopPropagation();
    this.detailsReset();
    this.toggleClass();

  
  }

  closeReviewPost =()=>{
    this.setState({
      reviewPost: false,
      reviewsShow:true
    })
  }


  giveFullDetail(){
    this.props.fetchReviews(this.props.ride._id);
    this.setState({fullDetail: true});
  }

  render() {
  //button options 
    let rideReviews = this.props.reviews.filter(review => review.rideId === this.props.ride._id)
    //checking to see if the user is posting or editing reviews

    let editedReview = rideReviews.filter((review => review.userId === this.props.currentUserId))
    //review button
    let yourReview =""
    let pastDownReview = {}
    if (editedReview.length===0){
      yourReview= "New Review"
      pastDownReview={
        rating:3,
        description: ""
      }
    } else {
      yourReview= "Edit Review"
      pastDownReview=editedReview[0]
    }
    

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
      {yourReview}
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
        onClick={() => this.props.activateModal("rideEdit", this.props.ride, null)}
      >
        Edit Ride
      </div>
    );
  }
  let button1container;
  let button2container;
  let button3container;



    button3container=(
       <div
        className={`ride-index-item-button ${this.props.ride._id}`}
        onClick={this.closeRideShow}
      >
        Collapse
      </div>
    )
      let dist = this.props.ride.distance ? `${this.props.ride.distance} miles` : "none given"
      let loc = this.props.ride.start_city ? this.props.ride.start_city : "check the map"
    let userRatings = this.props.ride.averageRating ? this.props.ride.averageRating  : "None Yet"
    
      let basicBar = (
          <div className="ride-index-item-container">
            <div className="ride-index-data">
              <div className="ride-index-item-title">{this.props.ride.title}</div>
              <div className="ride-index-item-datum">Location: {loc}</div>
              <div className="ride-index-item-datum">Distance: {dist}</div>
              <div className="ride-index-item-datum">Average Rating: {userRatings}</div>
              <div className="ride-index-item-datum">
                Duration: {this.props.ride.duration}
              </div>
            </div>
            <img src={this.state.sampleMap} className="ride-index-item-map" alt="map-of-ride" />
          </div>
  );

  let rideInfoBar =""
  
  if(this.state.fullDetail===false){
      rideInfoBar= basicBar
  } else{
    rideInfoBar = <RideShowContainer ride={this.props.ride} userRatings={userRatings} />;
  }



  // show reviews
  let showReviews = "";
 

  if (this.state.reviewsShow === true){
      showReviews = (<ReviewShow 
        rideId={this.props.ride._id}  
        fetchReviews={this.props.fetchReviews}
        deleteReview={this.props.deleteReview}
        reviews={rideReviews}
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
      button2container=button2;
  } else {
      createReview = (
        <ReviewForm
          currentUserId={this.props.currentUserId}
          postReview={this.props.postReview}
          rideId={this.props.ride._id}
          currentUserName={this.props.currentUserName}
          closeReviewPost={this.closeReviewPost}
          fetchReviews={this.props.fetchReviews}
          review={pastDownReview}
        />
      );
      button2container=null
  }
  


    return (
      <li
        className="ride-index-item"
        onClick={this.openRideShow}
        // onMouseLeave={this.closeRideShow}
      >
        
          {rideInfoBar}
          {showReviews}
          {createReview}
        
      
        <div className={`button-tray ${this.props.ride._id}`}>
          {button1container}
          {button2container}
          {button3container}
        </div>
      </li>
    );
  }
}

export default RideIndexItem;
