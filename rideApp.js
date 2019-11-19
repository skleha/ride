const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require("body-parser");
const passport = require('passport');

const users = require("./routes/api/users");
const rides = require("./routes/api/rides");
const reviews = require('./routes/api/reviews')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/rides", rides);
app.use("/api/reviews", reviews);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
