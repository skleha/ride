# Ride

[Live website!](https://ride-mern.herokuapp.com/)
<br></br>

## Description
Ride is a web application targeting the motorcycling enthusiast community.  The common theme between all motorcyclists is the "Ride", that stretch of ride that has the right amount of curves, the best views, the fast straightaways, and, of course, the burger joint to finish it all.  Ride, the web app, allows a user to record a ride on a map and peruse all saved rides.  Have a great idea for a ride? Use the "post" a ride feature to share it with your moto-brothers.  Don't know where to go this next Saturday?  Stop by Ride, and find your next adventure.  Have a comment on an existing ride?  Leave the community your nugget of wisdom in a ride review.  Our aim is to enhance the enjoyment of two wheeled riding everywhere!
<br></br>
Ride is a full stack, single page application.  In its construction, we've used __MongoDB__ accessed through __Mongoose__ and __Express__. __React__ and __Redux__ complete the application on the frontend.


## Key Features
  * Secure frontend to backend user authentication using json webtoken.
  * All rides are displayed after login, in an easy-to-view format.
  * Visitors and users alike may peruse the rides on the website.
  * A search bar allows for search on ride titles, e.g "san francisco" turns up all rides with "San Francisco" in the title, case insensitive.
  * Users can create, read, update and delete rides; users can create, read and update reviews.
  
## Select Screenshots
The note tile contains a title, body, any labels assigned to the note, and two action icons.  The two action icons include a tag, which will allow for label assignment and/or creation, and a trashcan, which will delete the note.<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/Screen+Shot+2019-11-15+at+10.31.09+AM.png" /><br></br>
The "virtual wall" of notes.<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/Screen+Shot+2019-11-15+at+11.25.36+AM.png" /><br></br>
Searching for notes that contain the "camping" text string (case-insensitive search):<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/Screen+Shot+2019-11-15+at+11.28.58+AM.png" /><br></br>

## Select Code Snippets
The following is the quick snippet showing the code to 'show' a note.  This code stores the note id in a slice of state and opens a modal.
```
showNote(e) {
    this.props.receiveCurrentNoteId(this.props.note.id);
    this.props.openModal('editNoteForm');
  }
```
The modal, and its contents, are displayed in a keyframes animation:
```
@keyframes modalAppear { 
    0% { opacity: 0; }
    100% { opacity: 1; }
}
```
The user clicks on a button with text of "close" to close and save the note.
```
    <button
        className="note-update-button"
         onClick={this.handleSubmit}>
         Close
    </button>
```

## Key Technologies
  * PostGreSQL
  * Ruby on Rails
  * React-Redux

## Future Implementations
The development roadmap for keeper includes some form of media attachment to a note.  Users will be able to attach a photo, describe it, and view it, along with text, on the virtual wall of notes.  Additionally, I plan to add collaboration, where a user can give another user read/write access to a note.  In this way, a note can be shared between two users and modified by either user.

