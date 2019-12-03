# Ride

[Live website!](https://ride-mern.herokuapp.com/)
<br></br>

## Description
Ride is a web application targeting the motorcycling enthusiast community.  The common theme between all motorcyclists is the "Ride", that stretch of road that has the right amount of curves, the best views, the fast straightaways, and, of course, the burger joint to finish it all.  Ride, the web app, allows a user to record a ride on a map and peruse all saved rides.  Have a great idea for a ride? Use the "post" a ride feature to share it with your moto-brothers and sisters.  Don't know where to go this next Saturday?  Stop by Ride and find your next adventure.  Have a comment on an existing ride?  Leave the community your nugget of wisdom in a ride review.  Our aim is to enhance the enjoyment of two wheeled riding everywhere.
<br></br>
Ride is a full stack, single page application.  In its construction, we've used __MongoDB__, __Mongoose__ and __Express__ on the backend. __React__ and __Redux__ complete the application on the frontend.  Other technologies include __BCrypt__ for password hashing and the __MapboxGL API__ for all map related functionality.

## Key Technologies
  * React
  * Redux
  * Express
  * Mongoose
  * MongoDb
  * MapboxGL

## Key Features
  * Secure frontend to backend user authentication using json webtoken.
  * All rides are displayed after login in an easy-to-view, ride tile format.
  * Visitors and users alike may peruse the rides on the website.
  * A search bar allows for search on ride titles, e.g "san francisco" turns up all rides with "San Francisco" in the title, case insensitive.
  * Users can create, read, update and delete rides; users can create, read and update reviews.
  * Users can rate rides, and average ratings for a ride are displayed on each ride tile.
  
## Select Screenshots
Our users are greeted by images of Joaquin Phoenix's legendary ride in the critically acclaimed movie "The Master":<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/ride_splash.png" /><br></br>
The main page of the app is an index of all the rides:<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/ride_index.png" /><br></br>
The image below shows a user searching for rides that contain the "skyline" text string (case-insensitive search).  You haven't ridden the Bay Area if you haven't done Skyline Blvd:<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/ride_search.png" /><br></br>
Creating a ride is simple, and the app guides you through the process.  First, fill out the text data:<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/ride_create.png" /><br></br>
And then click on the map to create waypoints.<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/ride_create2.png" /><br></br>
There's much more to the app, so be sure to visit and take the demo account for a test ride!

## Select Code Snippets
User authentication does not store the user's password, but rather a password digest:
```
bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    email: user.email,
                                    username: user.username,
                                    location: user.location
                                }
```
Ride data is stored a mongoDB backend, routed there using Express, through a set of friendly validations:
```
router.post('/', (req, res) => {

  const { errors, isValid } = validateRideInput(req.body);
  
    if (!isValid) {
      return res.status(404).json(errors);
  }


```
The single page app makes use of a React and Redux front end, with a number of components, including the searchbar:
```
  render() {
    return (
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          onChange={this.filterFunc}
        />
    );
  }
```
We've taken care in the styling of the website, to give it a clean, intuitive and seamless feel.  Styling of the ride create / update buttons was a concern.  We wanted the app to have smooth transitions to new functionality, as evident in this CSS transition:
```
.button-tray {
    background-color: white;
    display: flex;
    justify-content: space-around;
    height: 0px;
    transition: height .5s;
    z-index: 1;
}
```

## Future Implementations
The development roadmap for Ride includes some form of photo attachment to a ride.  Outside of the text fields and the actual map of the ride, a user might want to post a picture of a critical juncture or turn in the route, or a beautiful vista which really distinguishes the ride.