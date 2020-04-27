const express = require("express");
const mongoose = require("mongoose");


// user API
const users = require('./routes/api/user');

// events api
const events = require('./routes/api/events');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
     }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


  app.use('/api/user', users);
  app.use('/api/events', events);

  const port = 6000;
  app.listen(port, () => console.log(`Server running on port ${port}`));