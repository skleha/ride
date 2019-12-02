## Ride

[Live website!](https://keeper2503.herokuapp.com/#/)
<br></br>

### Description
Keeper is a cloud-based, easy-to-use, lightweight note-taking app that allows a user to capture the thoughts, ideas and details of life.  The format is similar to that of Post-it notes.  Notes are displayed on square note tiles, and displayed, along with all other notes, on virtual wall of thoughts, ideas and details.  Users can organize these thoughts using labels, and label links allow for the display of notes with the same label.  Alternatively, a note take can search all notes using a search string.  The note wall is immediately filtered to show the search results. 
<br></br>

### Key Features
  * Secure frontend to backend user authentication using BCrypt.
  * Users can create, read, update, and delete notes.
  * Users can create, read, update, and delete labels.
  * Notes are displayed on a virtual wall of notes.
  * A label can be applied to a note, e.g a "packing lists" label for a note that is a list of camping gear.
  * Each displayed note has a title, a body, its labels and action icons that allow the user to add a label or delete the note.
  * Users can search on a text string; notes are immediately filtered, showing the search result.
  
### Select Screenshots
The note tile contains a title, body, any labels assigned to the note, and two action icons.  The two action icons include a tag, which will allow for label assignment and/or creation, and a trashcan, which will delete the note.<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/Screen+Shot+2019-11-15+at+10.31.09+AM.png" /><br></br>
The "virtual wall" of notes.<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/Screen+Shot+2019-11-15+at+11.25.36+AM.png" /><br></br>
Searching for notes that contain the "camping" text string (case-insensitive search):<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/Screen+Shot+2019-11-15+at+11.28.58+AM.png" /><br></br>

### Select Code Snippets
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

### Key Technologies
  * PostGreSQL
  * Ruby on Rails
  * React-Redux

### Future Implementations
The development roadmap for keeper includes some form of media attachment to a note.  Users will be able to attach a photo, describe it, and view it, along with text, on the virtual wall of notes.  Additionally, I plan to add collaboration, where a user can give another user read/write access to a note.  In this way, a note can be shared between two users and modified by either user.

