const bodyParser = require("body-parser"); 
const mongoose = require('mongoose'); 
const db = require('./config/keys').mongoURI; 
const express = require("express"); 
const users = require("./routes/api/users"); 
const tweets = require("./routes/api/tweets");
const passport = require('passport');

const app = express(); 
const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    // console.log(res) 
    // debugger 
    res.send("Hello San Francisco, I miss Marvel Movies")
});


app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use("/api/users/", users); 
app.use("/api/tweets", tweets); 

app.listen(port, () => console.log(`Server is running on port ${port}`));

