import React from "react"
import StarRatingComponent from 'react-star-rating-component'

function ReviewShowItem(props){


    let star = (
     <div>
        <h4>Review Rating</h4>
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          starCount={5}
          value={props.review.rating}
        starColor={"#e80f0f"}
        />
      </div>

    )


    let username = (
        <div className = "reviewAuthorName">
           by-  {props.review.authorName}
        </div>
    )


    let deleteButton=""

    if(props.review.userId === props.currentUserId ){
        deleteButton= (
            <button className="form-button Clickable" onClick={()=>props.deleteReview(props.review._id)}>
                Delete Review
            </button>
        )
    }



    return(
        <li className= "ReviewShowItemContainer">
            <div className="ReviewItemTopTextArea">
                {props.review.description}
            </div>
            <div className = "ReviewItemBottom">
                {star}
                {username}
                {deleteButton}
            </div>
        </li>
    )
}

export default ReviewShowItem